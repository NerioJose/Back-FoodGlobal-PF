const { Usuario } = require('../../db');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


const restablecerContraseña = async (req, res) => {
  const { token, nuevaPassword } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() } // Verificar que el token no ha expirado
      }
    });

    if (!usuario) {
      return res.status(400).json({ error: 'Token inválido o expirado.' });
    }

  // Hashear la nueva contraseña
  const saltRounds = 10;
  usuario.password = await bcrypt.hash(nuevaPassword, saltRounds); // Aquí se hashea la contraseña

    // Actualizar la contraseña y limpiar el token
   // usuario.password = nuevaPassword; // Asegúrate de hashear la contraseña antes de guardarla
    usuario.resetPasswordToken = null;
    usuario.resetPasswordExpires = null;
    await usuario.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error al restablecer la contraseña.' });
  }
};

module.exports = { restablecerContraseña };
