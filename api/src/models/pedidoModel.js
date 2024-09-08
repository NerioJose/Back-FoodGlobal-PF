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
      allowNull: false,  // La fecha de creación del pedido
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,  // El monto total del pedido
    },
    // Nuevo campo para indicar si se retira o envía a domicilio
    tipo_entrega: {
      type: DataTypes.ENUM('retiro', 'domicilio'),
      allowNull: false,
      defaultValue: 'retiro',  // Por defecto, se configura como retiro
    },
    // Modifica el ENUM del campo 'estado' para incluir los nuevos estados
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_proceso', 'armando', 'retirando', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente',  // Estado inicial del pedido
    },
  }, {
    paranoid: true, // Habilita el borrado lógico (registro de eliminaciones)
    timestamps: true, // Mantiene createdAt y updatedAt para registro temporal
  });
};

