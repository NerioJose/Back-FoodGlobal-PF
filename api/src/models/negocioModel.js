const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Negocio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,             // Cadena de texto para almacenar la URL de la imagen.
      allowNull: true,                    // Este campo es opcional, puede ser nulo.
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    usuario_id: {
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
  });
};
