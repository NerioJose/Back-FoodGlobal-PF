const { Usuario } = require('../../db');
// Importa 'Op' desde Sequelize para usar operadores en consultas
const { Op } = require('sequelize');

const getUsuarios = async (req, res) => {
  try {
    const { nombre } = req.query;  // Extrae el parámetro 'nombre' de la cadena de consulta (req.query) en la URL de la solicitud

    let usuarios = [];

    if (nombre) {  // Si se proporciona un parámetro 'nombre'
     usuarios = await Usuario.findAll({  // Busca todos los usuarios que coincidan con el nombre proporcionado
        where: {
          nombre: {
            [Op.iLike]: '%${nombre}%'  // Utiliza el operador 'iLike' para hacer una búsqueda insensible a mayúsculas y minúsculas, buscando coincidencias parciales del nombre
          }
        }})
    } else {  // Si no se proporciona el parámetro 'nombre'
      usuarios = await Usuario.findAll();  // Obtiene todos los usuarios de la base de datos
    }

    if (usuarios.length === 0) {  // Si no se encuentran usuarios con el nombre proporcionado
      return res.status(404).json({ message: 'No se encontraron usuarios.' });  // Responde con un código de estado 404 y un mensaje indicando que no se encontraron usuarios
    } else {
      return res.status(200).json(usuarios);  // Responde con un código de estado 200 y devuelve la lista completa de usuarios en formato JSON
    }
  } catch (error) {  // Captura cualquier error que ocurra durante la ejecución
    console.error(error);  // Imprime el error en la consola para facilitar la depuración
    return res.status(500).json({ message: 'Error al obtener los usuarios.' });  // Responde con un código de estado 500 y un mensaje indicando que ocurrió un error interno del servidor
  }
}

module.exports = getUsuarios; 
