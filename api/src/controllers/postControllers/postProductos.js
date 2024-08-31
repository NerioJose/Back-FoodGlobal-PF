const { Producto } = require('../../db');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const postProductos = async (req, res) => {
  try {
    const { nombre, descripcion, precio, negocio_id, categoria, stock } = req.body;
    let imagen = req.file ? req.file.path : req.body.imagen;

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

    // Subir la imagen a Cloudinary si es una ruta local
    if (imagen && !req.file) { // Si se proporcionó una ruta local
      if (fs.existsSync(imagen)) { // Verificar si el archivo existe
        const uploadResult = await cloudinary.uploader.upload(imagen, {
          folder: 'foodglobal'
        });
        imagen = uploadResult.secure_url;
      } else {
        return res.status(400).json({ message: 'El archivo no existe.' });
      }
    }

    // Crear el nuevo producto en la base de datos
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      negocio_id,
      imagen,
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


