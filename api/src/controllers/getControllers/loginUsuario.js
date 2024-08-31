const { Usuario } = require('../../db');


const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;  // Extrae 'email' y 'password' del cuerpo de la solicitud (req.body)

        // Buscar al usuario por email en la base de datos
        const usuario = await Usuario.findOne({ where: { email } });  // Busca un usuario con el email proporcionado

        if (!usuario) {  // Si no se encuentra un usuario con ese email
            return res.status(404).json({ message: 'Usuario no encontrado.' });  // Retorna un error 404 indicando que el usuario no fue encontrado
        }

        // Comparar la contraseña directamente
        if (password !== usuario.password) {  // Compara la contraseña proporcionada con la guardada en la base de datos
            return res.status(401).json({ message: 'Contraseña incorrecta.' });  // Si las contraseñas no coinciden, retorna un error 401 (no autorizado)
        }

        // Autenticación exitosa
        return res.status(200).json({ message: 'Login exitoso.', usuario });  // Si las contraseñas coinciden, retorna un mensaje de éxito y el usuario
    } catch (error) {  // Captura cualquier error que ocurra durante el proceso
        console.error(error);  // Imprime el error en la consola
        return res.status(500).json({ message: 'Error al iniciar sesión.' });  // Retorna un error 500 indicando un problema en el servidor
    }
};

module.exports = loginUsuario;  
