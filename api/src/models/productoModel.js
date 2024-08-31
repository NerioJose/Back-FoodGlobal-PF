const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Producto', {
    id: {
      type: DataTypes.UUID,               // Tipo de dato UUID para una identificación única y universal.
      defaultValue: DataTypes.UUIDV4,     // Asigna automáticamente un valor UUIDv4 si no se proporciona uno.
      primaryKey: true,                   // Establece este campo como la clave primaria del modelo.
    },
    nombre: {
      type: DataTypes.STRING,             
      allowNull: false,                   // Indica que este campo es obligatorio, no puede ser nulo.
    },
    descripcion: {
      type: DataTypes.TEXT,               // Campo de tipo texto largo para la descripción del producto.
      allowNull: false,                   
    },
    precio: {
      type: DataTypes.FLOAT,              // Tipo FLOAT para almacenar precios con decimales.
      allowNull: false,                   
    },
    imagen: {
      type: DataTypes.STRING,             // Cadena de texto para almacenar la URL de la imagen.
      allowNull: true,                    // Este campo es opcional, puede ser nulo.
    },
    categoria: {
      type: DataTypes.STRING,               // Campo de tipo string para la categoria del producto.
      allowNull: false,                   
    },
    stock: {
      type: DataTypes.INTEGER,              // Tipo integer para mostrar el stock.
      allowNull: false,                   
    },
    // Definición de la columna negocio_id como clave foránea apuntando al modelo Negocio.
    negocio_id: {
      type: DataTypes.UUID,               // Define el tipo de dato como UUID para relacionarlo con el negocio asociado.
      allowNull: false,                   // Este campo es obligatorio, cada producto debe estar asociado a un negocio.
      references: {
        model: sequelize.models.Negocio,  // Cambio: Usando el modelo directamente para evitar errores de nombres.
        key: 'id',                        // La clave foránea apunta a la columna 'id' de la tabla 'Negocios'.
      },
    },
  });
};
