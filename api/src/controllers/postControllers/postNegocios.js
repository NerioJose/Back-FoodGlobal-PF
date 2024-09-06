const { Usuario } = require('../../db'); 

// Expresiones regulares para validaciones

const nombreRegex = /^[A-Za-z0-9\s]{3,}$/; // Nombre con al menos 3 caracteres, puede contener letras, números y espacios
const descripcionRegex = /^.{10,1000}$/; // Descripción entre 10 y 1000 caracteres

const postNegocios = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, usuario_id, status } = req.body;
    let imagenUrl = imagen; // Usa let aquí para permitir la reasignación

    // Validaciones con expresiones regulares
    if (!nombreRegex.test(nombre)) {
      return res.status(400).json({ message: 'Nombre inválido. Debe tener al menos 3 caracteres y solo contener letras, números y espacios.' });
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


    // Subir la imagen a Cloudinary si es una ruta local
    if (imagen && !/^https?:\/\//i.test(imagen)) { // Si la imagen no es una URL remota
      console.log(`Verificando archivo en: ${imagen}`);
      if (fs.existsSync(imagen)) { // Verificar si el archivo existe
        const uploadResult = await cloudinary.uploader.upload(imagen, {
          folder: 'foodglobal'
        });
        imagenUrl = uploadResult.secure_url; // Reasignar imagenUrl con la URL de Cloudinary
      } else {
        return res.status(400).json({ message: 'El archivo no existe en la ruta especificada.' });
      }
    } else if (imagen) { // Si la imagen es una URL remota
      // Subir imagen desde URL remota a Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imagen, {
        folder: 'foodglobal'
      });
      imagenUrl = uploadResult.secure_url; // Reasignar imagenUrl con la URL de Cloudinary
    }

    // Validar el campo status, si no se pasa, asignar por defecto 'activo'
    const negocioStatus = status || 'activo';

    // Crear el nuevo negocio
    const nuevoNegocio = await Negocio.create({
      nombre,
      descripcion,
      imagen: imagenUrl, // Asegúrate de que se incluye la imagen
      usuario_id,
      status: negocioStatus, // Asignar el status
    });

    return res.status(201).json(nuevoNegocio);

  } catch (error) {
    console.error(error); // Muestra el error en la consola para facilitar la depuración
    return res.status(500).json({ error: 'Error al crear el usuario.' }); // Devuelve un error 500 si algo falla en la creación del usuario
  }
};

module.exports = postNegocios; 




