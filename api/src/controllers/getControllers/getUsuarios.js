const { Usuario } = require('../../db');
const { Op } = require('sequelize');

const getUsuarios = async (req, res) => {
  try {
    const { nombre } = req.query;
    let usuarios = [];

    // Filtrar solo los usuarios con status 'activo'
    const whereClause = { status: 'activo' };

    if (nombre) {
      // Si se proporciona un nombre, agregar la condición de búsqueda por nombre
      whereClause.nombre = { [Op.iLike]: `%${nombre}%` };
    }

    // Obtener usuarios filtrados por nombre (si existe) y status 'activo'
    usuarios = await Usuario.findAll({ where: whereClause });

    if (usuarios.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios activos.' });
    } else {
      return res.status(200).json(usuarios);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener los usuarios.' });
  }
};

module.exports = getUsuarios;
