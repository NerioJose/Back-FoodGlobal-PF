const { Usuario } = require('../../db');

const deleteUsuario = async (req, res) => {
  const { id } = req.params; // Extrae el ID del usuario desde los parámetros de la URL

  try {
    // Busca al usuario por ID
    const usuario = await Usuario.findByPk(id);

    if (!usuario) { // Si no se encuentra el usuario
      return res.status(404).json({ error: 'Usuario no encontrado.' }); // Responde con un error 404
    }

    // Elimina el usuario de la base de datos
    await usuario.destroy();

    return res.status(200).json({ message: 'Usuario eliminado exitosamente.' }); // Responde con un estado 200 y un mensaje de éxito
  } catch (error) {
    console.error(error); // Imprime el error en la consola para depuración
    return res.status(500).json({ error: 'Error al eliminar el usuario.' }); // Responde con un error 500 si ocurre un problema durante la eliminación
  }
};

module.exports = deleteUsuario;
