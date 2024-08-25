const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: { // Agregamos la nueva columna
      type: DataTypes.STRING,
      allowNull: true, // Permitir nulos al principio
    },
    rol: {
      type: DataTypes.ENUM('usuario', 'admin', "socio"),
      allowNull: false,
      defaultValue: 'usuario',
    },
  },
{paranoid: true} //activa borrado lógico
);
  timestamp: false
};


