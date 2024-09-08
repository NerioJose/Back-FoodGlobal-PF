const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pedido', {
    id: {
      type: DataTypes.UUID,  // UUID para asegurar un identificador único
      defaultValue: DataTypes.UUIDV4,  // Generar automáticamente UUIDV4
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,  // Referencia al modelo Usuarios
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
    fecha: {
      type: DataTypes.DATE,  // Fecha en la que se realizó el pedido
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL,  // Total del pedido
      allowNull: false,
    },
    // Nuevo campo para indicar si se retira o se envía a domicilio
    tipo_entrega: {
      type: DataTypes.ENUM('retiro', 'domicilio'),  // Solo permite dos opciones: 'retiro' o 'domicilio'
      allowNull: false,
      defaultValue: 'retiro',  // Valor por defecto: retiro
    },
    // Modifica el ENUM del campo 'estado' para incluir los nuevos estados
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_proceso', 'armando', 'retirando', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente',  // Estado inicial del pedido
    },
  }, {
    paranoid: true,  // Habilita el borrado lógico
    timestamps: true,  // Mantiene las columnas createdAt y updatedAt
  });
};

