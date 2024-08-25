const { Producto } = require('../../db');
// Importamos el módulo Op de Sequelize para usar operadores como iLike
const { Op } = require('sequelize');


const getProductos = async (req, res) => {
  try {
    // Desestructuramos el parámetro 'nombre' de la consulta (req.query)
    // Si el usuario envía ?nombre=algo en la URL, se almacenará en esta variable
    const { nombre } = req.query;

    // Verificamos si el parámetro 'nombre' fue proporcionado en la consulta
    if (nombre) {
      // Si se proporciona un nombre, buscamos productos cuyo nombre coincida parcial o totalmente
      const productos = await Producto.findAll({
        where: {
          // Usamos el operador iLike para buscar sin distinguir entre mayúsculas y minúsculas
          nombre: {
            [Op.iLike]: `%${nombre}%`  // El % antes y después del nombre permite la coincidencia parcial
          }
        }
      });

      // Si no se encuentran productos que coincidan con el nombre, devolvemos un estado 404 (No encontrado)
      if (productos.length === 0) {
        return res.status(404).json({ message: 'No se encontraron productos.' });
      }

      // Si se encuentran productos, los devolvemos en la respuesta con un estado 200 (OK)
      return res.status(200).json(productos);
    }

    // Si no se proporciona el parámetro 'nombre', devolvemos la lista completa de productos
    const productos = await Producto.findAll();
    return res.status(200).json(productos);  // Enviamos todos los productos con un estado 200 (OK)
  } catch (error) {
    // Si ocurre un error en la ejecución, lo capturamos y mostramos un mensaje de error en la consola
    console.error(error);
    // Además, devolvemos un mensaje de error con un código de estado 500 (Error interno del servidor)
    return res.status(500).json({ message: 'Error al obtener los productos.' });
  }
};


module.exports = getProductos;


