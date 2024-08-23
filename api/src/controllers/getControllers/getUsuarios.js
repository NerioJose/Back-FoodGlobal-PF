const { Usuario } = require('../../db');

const getUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios de la base de datos
    const usuarios = await Usuario.findAll();
    
    // Verificar si hay usuarios
    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios.' });
    }
    
    // Enviar la respuesta con los usuarios
    return res.status(200).json(usuarios);
  } catch (error) {
    // Manejo de errores
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
};

module.exports = getUsuarios;
