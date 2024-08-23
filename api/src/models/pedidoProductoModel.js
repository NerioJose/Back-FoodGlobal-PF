const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pedido_Producto', {
    pedido_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Pedidos',
        key: 'id',
      },
    },
    producto_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Productos',
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
