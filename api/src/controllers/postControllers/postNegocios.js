const { Negocio, Usuario } = require('../../db');

// Expresiones regulares para validaciones
const nombreRegex = /^[A-Za-z0-9\s]{3,}$/; // Nombre con al menos 3 caracteres, puede contener letras, números y espacios
const descripcionRegex = /^.{10,1000}$/; // Descripción entre 10 y 1000 caracteres

const postNegocios = async (req, res) => {
  try {
    const { nombre, descripcion, usuario_id } = req.body;

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

    // Crear el nuevo negocio
    const nuevoNegocio = await Negocio.create({
      nombre,
      descripcion,
      usuario_id,
    });

    return res.status(201).json(nuevoNegocio);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocurrió un error al crear el negocio.' });
  }
};

module.exports = postNegocios;
