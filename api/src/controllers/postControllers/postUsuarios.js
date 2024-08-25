const { Usuario } = require('../../db');

// Expresiones regulares para validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // Contraseña entre 6 y 20 caracteres, con al menos un número, una letra mayúscula y una letra minúscula
const rolRegex = /^(admin|usuario)$/; // Roles permitidos
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios

const postUsuarios = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  // Validar nombre
  if (typeof nombre !== 'string' || nombre.length < 3 || !nombreRegex.test(nombre)) {
    return res.status(400).json({ error: 'El nombre debe ser una cadena de al menos 3 letras y no debe contener solo números o símbolos.' });
  }

  // Validar email
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'El email debe ser una dirección de correo electrónico válida.' });
  }

  // Validar contraseña
  if (typeof password !== 'string' || !passwordRegex.test(password)) {
    return res.status(400).json({ error: 'La contraseña debe tener entre 6 y 20 caracteres, y debe contener al menos un número, una letra mayúscula y una letra minúscula.' });
  }

  // Validar rol
  if (typeof rol !== 'string' || !rolRegex.test(rol)) {
    return res.status(400).json({ error: 'El rol debe ser uno de los siguientes: "admin" o "usuario".' });
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'Ya existe un usuario con ese email.' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({ nombre, email, password, rol });
    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error); // Mejorar la visibilidad del error en los logs
    return res.status(500).json({ error: 'Error al crear el usuario.' });
  }
};

module.exports = postUsuarios;
