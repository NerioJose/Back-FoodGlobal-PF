require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Configura la conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/foodglobal`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

// Lee todos los archivos de la carpeta Models y agrégalos a modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyecta la conexión (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Capitaliza los nombres de los modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(([name, model]) => [name[0].toUpperCase() + name.slice(1), model]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
const { Chat, Negocio, Notificaciones, Pago, Pedido, Producto, Reseña, Usuario, Carrito, Carrito_Producto } = sequelize.models;

// Relación Chat
Chat.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Chat, { foreignKey: 'usuario_id' });
Chat.belongsTo(Negocio, { foreignKey: 'negocio_id' });
Negocio.hasMany(Chat, { foreignKey: 'negocio_id' });

// Relación Negocio
Negocio.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuario_id' });
Usuario.hasMany(Negocio, { foreignKey: 'usuario_id' });

// Relación Notificación
Notificaciones.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Notificaciones, { foreignKey: 'usuario_id' });

// Relación Pago
Pago.belongsTo(Pedido, { foreignKey: 'pedido_id' });
Pedido.hasOne(Pago, { foreignKey: 'pedido_id' });

// Relación Pedido
Pedido.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Pedido, { foreignKey: 'usuario_id' });

// Relación Producto
Producto.belongsTo(Negocio, { foreignKey: 'negocio_id' });
Negocio.hasMany(Producto, { foreignKey: 'negocio_id' });

// Relación Reseña
Reseña.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Reseña, { foreignKey: 'usuario_id' });
Reseña.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(Reseña, { foreignKey: 'producto_id' });

// Relaciones Carrito
Carrito.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Usuario.hasMany(Carrito, { foreignKey: 'usuario_id' });

Carrito_Producto.belongsTo(Carrito, { foreignKey: 'carrito_id' });
Carrito.hasMany(Carrito_Producto, { foreignKey: 'carrito_id' });

Carrito_Producto.belongsTo(Producto, { foreignKey: 'producto_id' });
Producto.hasMany(Carrito_Producto, { foreignKey: 'producto_id' });

// Exporta la conexión y los modelos
module.exports = {
  ...sequelize.models, 
  conn: sequelize,  // Asegúrate de que conn esté exportado correctamente
};
