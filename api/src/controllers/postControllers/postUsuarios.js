const { Usuario } = require('../../db'); 

// Expresiones regulares para validaciones
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida que el email tenga un formato válido (ej. usuario@dominio.com)
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // Valida que la contraseña tenga entre 6 y 20 caracteres, con al menos un número, una letra mayúscula, y una letra minúscula
const rolRegex = /^(admin|usuario|socio)$/; // Valida que el rol sea 'admin', 'usuario' o 'socio'
const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Valida que el nombre solo contenga letras (incluyendo acentos) y espacios

const postUsuarios = async (req, res) => {
  const { nombre, apellido, imagen, email, password, rol } = req.body; // Extrae los datos enviados en la solicitud

  // Validar nombre
  if (typeof nombre !== 'string' || nombre.length < 3 || !nombreRegex.test(nombre)) {
    // Comprueba que el nombre sea una cadena, tenga al menos 3 caracteres y solo contenga letras y espacios
    return res.status(400).json({ error: 'El nombre debe ser una cadena de al menos 3 letras.' }); // Devuelve un error 400 si la validación falla
  }

  // Validar email
  if (typeof email !== 'string' || !emailRegex.test(email)) {
    // Comprueba que el email sea una cadena y tenga un formato válido
    return res.status(400).json({ error: 'El email debe ser una dirección de correo electrónico válida.' }); // Devuelve un error 400 si la validación falla
  }

  // Validar contraseña
  if (typeof password !== 'string' || !passwordRegex.test(password)) {
    // Comprueba que la contraseña sea una cadena y cumpla con los requisitos de la expresión regular
    return res.status(400).json({ error: 'La contraseña debe tener entre 6 y 20 caracteres, con al menos un número, una letra mayúscula y una letra minúscula.' }); // Devuelve un error 400 si la validación falla
  }

  // Validar rol
  if (typeof rol !== 'string' || !rolRegex.test(rol)) {
    // Comprueba que el rol sea una cadena y coincida con uno de los roles permitidos
    return res.status(400).json({ error: 'El rol debe ser uno de los siguientes: "admin", "usuario", o "socio".' }); // Devuelve un error 400 si la validación falla
  }

  try {
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      // Si ya existe un usuario con el mismo email, devuelve un error 400
      return res.status(400).json({ error: 'Ya existe un usuario con ese email.' });
    }

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuario.create({ nombre, apellido, imagen, email, password, rol });
    return res.status(201).json(nuevoUsuario); // Devuelve el nuevo usuario creado con un estado 201 (creado)
  } catch (error) {
    console.error(error); // Muestra el error en la consola para facilitar la depuración
    return res.status(500).json({ error: 'Error al crear el usuario.' }); // Devuelve un error 500 si algo falla en la creación del usuario
  }
};

module.exports = postUsuarios; 
