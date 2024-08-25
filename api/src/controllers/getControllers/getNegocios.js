const { Negocio } = require('../../db');
// Importamos el módulo Op de Sequelize para usar operadores como iLike
const { Op } = require('sequelize');


const getNegocios = async (req, res) => {
    try {
        // Desestructuramos el parámetro 'nombre' de la consulta (req.query)
        // Si el usuario envía ?nombre=algo en la URL, se almacenará en esta variable
        const { nombre } = req.query;

        // Verificamos si el parámetro 'nombre' fue proporcionado en la consulta
        if (nombre) {
            // Si se proporciona un nombre, buscamos negocios cuyo nombre coincida parcial o totalmente
            const negocios = await Negocio.findAll({
                where: {
                    // Usamos el operador iLike para buscar sin distinguir entre mayúsculas y minúsculas
                    nombre: {
                        [Op.iLike]: `%${nombre}%`  // El % antes y después del nombre permite la coincidencia parcial
                    }
                }
            });

            // Si no se encuentran negocios que coincidan con el nombre, devolvemos un estado 404 (No encontrado)
            if (negocios.length === 0) {
                return res.status(404).json({ message: 'No se encontraron negocios.' });
            }

            // Si se encuentran negocios, los devolvemos en la respuesta con un estado 200 (OK)
            return res.status(200).json(negocios);
        }

        // Si no se proporciona el parámetro 'nombre', devolvemos la lista completa de negocios
        const negocios = await Negocio.findAll();
        return res.status(200).json(negocios);  // Enviamos todos los negocios con un estado 200 (OK)
    } catch (error) {
        // Si ocurre un error en la ejecución, lo capturamos y mostramos un mensaje de error en la consola
        console.error(error);
        // Además, devolvemos un mensaje de error con un código de estado 500 (Error interno del servidor)
        return res.status(500).json({ message: 'Error al obtener los negocios.' });
    }
};


module.exports = getNegocios;
