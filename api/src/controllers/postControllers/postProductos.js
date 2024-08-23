const { Producto } = require('../../db');

const postProductos = async (req, res) => {
  try {
    // Desestructurar los campos necesarios desde req.body
    const { nombre, descripcion, precio } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    // Crear el nuevo producto en la base de datos
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
    });

    // Enviar una respuesta exitosa al cliente
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    // Manejar cualquier error que ocurra
    console.error(error);
    return res.status(500).json({ message: 'Ocurrió un error al crear el producto.' });
  }
};

module.exports = postProductos;
