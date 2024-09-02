const { Producto } = require('../../db');
const cloudinary = require('cloudinary').v2;

const postProductos = async (req, res) => {
  try {
    const { nombre, descripcion, precio, negocio_id, categoria, stock, imagen } = req.body;

    if (!nombre || !descripcion || !precio || !negocio_id || !categoria || !stock) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    // Verificar si el producto ya existe por nombre
    const productoExistente = await Producto.findOne({
      where: { nombre }
    });

    if (productoExistente) {
      return res.status(400).json({ message: 'El producto ya existe.' });
    }

    // Validar si la URL de la imagen es válida
    let imagenURL = imagen;

    if (imagen && !imagen.startsWith('http')) {

    } else {
      imagenURL = imagen;
    }

    // Crear el nuevo producto en la base de datos
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      negocio_id,
      imagen: imagenURL,
      categoria,
      stock
    });

    return res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    return res.status(500).json({ message: 'Ocurrió un error al crear el producto.' });
  }
};

module.exports = postProductos;