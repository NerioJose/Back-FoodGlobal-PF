const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Pedido', {
    id: {
      type: DataTypes.UUID,  // El ID es un UUID
      defaultValue: DataTypes.UUIDV4,  // Se genera automáticamente un UUID
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.UUID,  // ID del usuario
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id',
      },
    },
    negocio_id: {  // Agregamos el ID de negocio
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Negocios',  // Relación con el modelo Negocio
        key: 'id',
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,  // La fecha del pedido es obligatoria
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: false,  // El total del pedido es obligatorio
    },
    tipo_entrega: {
      type: DataTypes.ENUM('retiro', 'domicilio'),  // Opciones para el tipo de entrega
      allowNull: false,
      defaultValue: 'retiro',  // Valor por defecto es 'retiro'
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_proceso', 'armando', 'retirando', 'entregado', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendiente',  // Valor por defecto es 'pendiente'
    },
  }, {
    paranoid: true,  // Borrado lógico activado
    timestamps: true,  // Timestamps activados
  });
};
