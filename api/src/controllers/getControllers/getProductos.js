const { Producto } = require('../../db'); // Importa el modelo 'Producto' desde el archivo de base de datos.
const { Op } = require('sequelize'); // Importa los operadores de Sequelize, en este caso, 'Op' para utilizar en consultas.

const getProductos = async (req, res) => {
  try {
    const { nombre } = req.query; // Extrae el parámetro 'nombre' de la consulta (req.query). Este parámetro puede usarse para buscar productos.

    // Si se proporciona un nombre, buscamos productos cuyo nombre coincida parcial o totalmente
    if (nombre) {
      const productosDb = await Producto.findAll({
        where: {
          nombre: {
            [Op.iLike]: `%${nombre}%` // Usa el operador 'iLike' para hacer una búsqueda insensible a mayúsculas y minúsculas.
          }
        }
      });

      if (productosDb.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos.' }); // Si no se encontraron productos, devuelve un mensaje de error 404 (No encontrado).
      }

      return res.status(200).json(productosDb); // Si se encontraron productos, devuelve la lista con un estado 200 (OK).
    }

    // Si no se proporciona el parámetro 'nombre', obtenemos todos los productos
    const productosDb = await Producto.findAll(); // Obtiene todos los productos de la base de datos.

    return res.status(200).json(productosDb); // Devuelve la lista con un estado 200 (OK).
  } catch (error) { // Captura cualquier error que ocurra durante la ejecución.
    console.error(error); // Imprime el error en la consola para depuración.
    return res.status(500).json({ message: 'Error al obtener los productos.' }); // Devuelve un mensaje de error 500 (Error interno del servidor) si ocurre un error.
  }
};

module.exports = getProductos;
