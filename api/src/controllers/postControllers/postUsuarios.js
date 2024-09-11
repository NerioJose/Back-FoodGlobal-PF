const { Usuario } = require('../../db');
const enviarCorreo = require('../../services/mailService');

// Expresiones regulares para validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; 
const rolRegex = /^(admin|usuario|socio)$/; 
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

const postUsuarios = async (req, res) => {
  const { nombre, apellido, imagen, email, password, rol } = req.body;

  // Validaciones (ya las tienes bien definidas)
  if (typeof nombre !== 'string' || nombre.length < 3 || !nombreRegex.test(nombre)) {
    return res.status(400).json({ error: 'El nombre debe ser una cadena de al menos 3 letras.' });
  }
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email debe ser una dirección de correo electrónico válida.' });
  }
  if (typeof password !== 'string' || !passwordRegex.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener entre 6 y 20 caracteres, con al menos un número, una letra mayúscula y una letra minúscula.' });
  }
  if (typeof rol !== 'string' || !rolRegex.test(rol)) {
    return res.status(400).json({ error: 'El rol debe ser uno de los siguientes: "admin", "usuario", o "socio".' });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email.' });
    }

    // Crear el nuevo usuario, con status 'activo' por defecto
    const nuevoUsuario = await Usuario.create({ 
      nombre, 
      apellido, 
      imagen, 
      email, 
      password, 
      rol, 
      status: 'activo' // Añadimos el estado por defecto 'activo'
    });

    // Enviar el correo de notificación
    const asunto = 'Confirmación de Registro';
    const mensaje = `Hola ${nombre},\n\nTu registro en nuestra plataforma ha sido exitoso. ¡Bienvenido!\n\nSaludos,\nEquipo de Soporte`;

    await enviarCorreo(email, asunto, mensaje);

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

module.exports = postUsuarios;
