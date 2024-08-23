const { Producto } = require('../../db');

const getProductos = async (req, res) => {
  try {
    // Obtener todos los productos de la base de datos
    const productos = await Producto.findAll();
    
    // Devolver los productos en formato JSON
    res.json(productos);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = getProductos;
