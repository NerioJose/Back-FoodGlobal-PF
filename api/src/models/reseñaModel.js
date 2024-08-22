const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Reseña', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.TEXT,
    },
  });
};
