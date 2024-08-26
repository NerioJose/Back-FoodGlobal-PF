const fs = require('fs'); // Importa el módulo 'fs' para interactuar con el sistema de archivos.
const path = require('path'); // Importa el módulo 'path' para trabajar con rutas de archivos.
const { Producto } = require('../../db'); // Importa el modelo 'Producto' desde el archivo de base de datos.
const { Op } = require('sequelize'); // Importa los operadores de Sequelize, en este caso, 'Op' para utilizar en consultas.

const jsonFilePath = path.join(__dirname, '../../../db.json'); // Define la ruta al archivo JSON que contiene productos.

const getProductos = async (req, res) => { 
  try {
    const { nombre } = req.query; // Extrae el parámetro 'nombre' de la consulta (req.query). Este parámetro puede usarse para buscar productos.

    // Leer productos del archivo JSON
    const dbProducts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8')); // Lee el contenido del archivo JSON y lo convierte a un objeto JavaScript. Se supone que 'db.json' contiene productos.

    // Si se proporciona un nombre, buscamos productos cuyo nombre coincida parcial o totalmente
    if (nombre) { // Verifica si se proporcionó el parámetro 'nombre' en la consulta.
      const productosDb = await Producto.findAll({ // Realiza una consulta a la base de datos para buscar productos cuyo nombre coincida con el parámetro 'nombre'.
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%` // Usa el operador 'iLike' para hacer una búsqueda insensible a mayúsculas y minúsculas.
          }
        } 
      });

      // Filtra productos del archivo JSON que coincidan con el nombre
      const filteredJsonProducts = dbProducts.filter(producto => // Filtra los productos del archivo JSON para incluir solo aquellos cuyo nombre contenga el parámetro 'nombre'.
        producto.nombre.toLowerCase().includes(nombre.toLowerCase()) // Comparación insensible a mayúsculas y minúsculas.
      );

      // Combina productos de la base de datos y del JSON
      const combinedProducts = [
        ...productosDb.map(p => p.toJSON()), // Convierte los productos de la base de datos a formato JSON y los agrega a la lista combinada.
        ...filteredJsonProducts // Agrega los productos del archivo JSON que coinciden con el nombre a la lista combinada.
      ];

      if (combinedProducts.length === 0) { // Verifica si la lista combinada está vacía.
        return res.status(404).json({ message: 'No se encontraron productos.' }); // Si está vacía, devuelve un mensaje de error 404 (No encontrado).
      }

      return res.status(200).json(combinedProducts); // Si se encontraron productos, devuelve la lista combinada con un estado 200 (OK).
    }

    // Si no se proporciona el parámetro 'nombre', obtenemos todos los productos
    const productosDb = await Producto.findAll(); // Obtiene todos los productos de la base de datos.

    // Combina todos los productos de la base de datos y del JSON
    const combinedProducts = [
      ...productosDb.map(p => p.toJSON()), // Convierte todos los productos de la base de datos a formato JSON y los agrega a la lista combinada.
      ...dbProducts // Agrega todos los productos del archivo JSON a la lista combinada.
    ];

    return res.status(200).json(combinedProducts); // Devuelve la lista combinada con un estado 200 (OK).
  } catch (error) { // Captura cualquier error que ocurra durante la ejecución.
    console.error(error); // Imprime el error en la consola para depuración.
    return res.status(500).json({ message: 'Error al obtener los productos.' }); // Devuelve un mensaje de error 500 (Error interno del servidor) si ocurre un error.
  }
};

module.exports = getProductos; 
