const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('PedidoProducto', {
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
