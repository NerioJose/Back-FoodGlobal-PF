const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pedido', {
    id: {
      type: DataTypes.UUID,  // Cambiado a UUID
      defaultValue: DataTypes.UUIDV4,  // Se agrega defaultValue para generar automáticamente un UUID
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,  // UUID es consistente con el modelo Usuarios
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    paranoid: true, // Habilita el borrado lógico (registro de eliminaciones)
    timestamps: true, // Deshabilita los timestamps (createdAt y updatedAt)
  });
};
