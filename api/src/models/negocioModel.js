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
      type: DataTypes.STRING,
      allowNull: true,
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
  }, {
    paranoid: true, // Habilita el borrado lógico (registro de eliminaciones)
    timestamps: true, // Deshabilita los timestamps (createdAt y updatedAt)
  });
};
