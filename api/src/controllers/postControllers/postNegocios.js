const fs = require('fs');
const cloudinary = require('cloudinary').v2; // Importa y configura Cloudinary
const { Negocio, Usuario } = require('../../db');

// Expresiones regulares para validaciones
const nombreRegex = /^[A-Za-z0-9\s]{3,}$/; // Nombre con al menos 3 caracteres, puede contener letras, números y espacios
const descripcionRegex = /^.{10,1000}$/; // Descripción entre 10 y 1000 caracteres

const postNegocios = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, usuario_id } = req.body;
    let imagenUrl = imagen; // Usa `let` aquí para permitir la reasignación

    // Validaciones con expresiones regulares
    if (!nombreRegex.test(nombre)) {
      return res.status(400).json({ message: 'Nombre inválido. Debe tener al menos 3 caracteres y solo contener letras, números y espacios.' });
    }

    if (!descripcionRegex.test(descripcion)) {
      return res.status(400).json({ message: 'Descripción inválida. Debe tener entre 10 y 1000 caracteres.' });
    }

    if (!usuario_id) {
      return res.status(400).json({ message: 'Falta el ID del usuario.' });
    }

    // Verificar que el usuario existe
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(400).json({ message: 'El usuario no existe.' });
    }

    // Subir la imagen a Cloudinary si es una ruta local
    if (imagen && !/^https?:\/\//i.test(imagen)) { // Si la imagen no es una URL remota
      console.log(`Verificando archivo en: ${imagen}`);
      if (fs.existsSync(imagen)) { // Verificar si el archivo existe
        const uploadResult = await cloudinary.uploader.upload(imagen, {
          folder: 'foodglobal'
        });
        imagenUrl = uploadResult.secure_url; // Reasignar `imagenUrl` con la URL de Cloudinary
      } else {
        return res.status(400).json({ message: 'El archivo no existe en la ruta especificada.' });
      }
    } else if (imagen) { // Si la imagen es una URL remota
      // Subir imagen desde URL remota a Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imagen, {
        folder: 'foodglobal'
      });
      imagenUrl = uploadResult.secure_url; // Reasignar `imagenUrl` con la URL de Cloudinary
    }

    // Crear el nuevo negocio
    const nuevoNegocio = await Negocio.create({
      nombre,
      descripcion,
      imagen: imagenUrl, // Asegúrate de que se incluye la imagen
      usuario_id,
    });

    return res.status(201).json(nuevoNegocio);
  } catch (error) {
    console.error('Error al crear el negocio:', error);
    return res.status(500).json({ message: 'Ocurrió un error al crear el negocio.', error: error.message });
  }
};

module.exports = postNegocios;

