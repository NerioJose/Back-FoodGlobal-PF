const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pedido', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
    negocio_id: {
      type: DataTypes.UUID,
      allowNull: true,  // Ahora puede ser null en la creación del pedido
      references: {
        model: 'Negocios',
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
    tipo_entrega: {
      type: DataTypes.ENUM('retiro', 'domicilio'),
      allowNull: false,
      defaultValue: 'retiro',
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_proceso', 'armando', 'retirando', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente',
    },
  }, {
    paranoid: true,
    timestamps: true,
  });
};
