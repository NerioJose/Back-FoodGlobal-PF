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
const { Chat, Negocio, Notificacion, Pago, Pedido, Producto, Reseña, Usuario, Carrito, Carrito_Producto } = sequelize.models;

// Relación Chat
Chat.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Chat, { foreignKey: 'usuarioId' });
Chat.belongsTo(Negocio, { foreignKey: 'negocioId' });
Negocio.hasMany(Chat, { foreignKey: 'negocioId' });

// Relación Negocio
Negocio.belongsTo(Usuario, { as: 'propietario', foreignKey: 'usuarioId' });
Usuario.hasMany(Negocio, { foreignKey: 'usuarioId' });

// Relación Notificación
Notificacion.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Notificacion, { foreignKey: 'usuarioId' });

// Relación Pago
Pago.belongsTo(Pedido, { foreignKey: 'pedidoId' });
Pedido.hasOne(Pago, { foreignKey: 'pedidoId' });

// Relación Pedido
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });

// Relación Producto
Producto.belongsTo(Negocio, { foreignKey: 'negocioId' });
Negocio.hasMany(Producto, { foreignKey: 'negocioId' });

// Relación Reseña
Reseña.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Reseña, { foreignKey: 'usuarioId' });
Reseña.belongsTo(Producto, { foreignKey: 'productoId' });
Producto.hasMany(Reseña, { foreignKey: 'productoId' });

// Relaciones Carrito
Carrito.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Carrito, { foreignKey: 'usuarioId' });

Carrito_Producto.belongsTo(Carrito, { foreignKey: 'carritoId' });
Carrito.hasMany(Carrito_Producto, { foreignKey: 'carritoId' });

Carrito_Producto.belongsTo(Producto, { foreignKey: 'productoId' });
Producto.hasMany(Carrito_Producto, { foreignKey: 'productoId' });

// Exporta la conexión y los modelos
module.exports = {
  ...sequelize.models, 
  conn: sequelize,  // Asegúrate de que conn esté exportado correctamente
};
