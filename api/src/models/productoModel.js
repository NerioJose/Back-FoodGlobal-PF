const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Producto', {
    id: {
      type: DataTypes.UUID,               // tipo de dato UUID para una identificación única y universal.
      defaultValue: DataTypes.UUIDV4,     // Asigna automáticamente un valor UUIDv4 si no se proporciona uno.
      primaryKey: true,                   //  clave primaria del modelo.
    },
    nombre: {
      type: DataTypes.STRING,             
      allowNull: false,                   // Indica que este campo es obligatorio, no puede ser nulo.
    },
    descripcion: {
      type: DataTypes.TEXT,               // texto largo
      allowNull: false,                 
    },
    precio: {
      type: DataTypes.FLOAT,              // número decimal (FLOAT).
      allowNull: false,                   // 
    },
    imagen: {
      type: DataTypes.STRING,             //  cadena de texto para almacenar la URL de la imagen.
      allowNull: true,                    // Este campo es opcional, puede ser nulo.
    },
    //agregando columna negocio_id que será una clave foránea apuntando al modelo Negocio.
    negocio_id: {
      type: DataTypes.UUID,               // Define el tipo de dato como UUID para relacionarlo con el negocio asociado.
      allowNull: false,                   // Este campo es obligatorio, cada producto debe estar asociado a un negocio.
      references: {
        model: 'Negocios',                // Especifica que esta columna se refiere a la columna 'id' del modelo relacionado 'Negocios'.
        key: 'id',                        // La clave foránea apunta a la columna 'id' de la tabla 'Negocios'.
      },
    },
  });
};
