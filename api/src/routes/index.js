// const express = require('express');
// const routes = express.Router();

// const { Usuario, Producto, Pedido_Producto, Pedido, Pago, Negocio } = require('../db'); // Ajusta la ruta si es necesario

// const recoverEntity = require('../controllers/common/recoverEntity');


// // Importar todos los controladores  
// // Get Controllers
// const getDetailNegocios = require('../controllers/getControllers/getDetailNegocios');
// const getDetailProductos = require('../controllers/getControllers/getDetailProductos');
// const getNegocios = require('../controllers/getControllers/getNegocios');
// const getProductos = require('../controllers/getControllers/getProductos');
// const getUsuarios = require('../controllers/getControllers/getUsuarios');
// const getProductosPorNegocio = require('../controllers/getControllers/getProductosPorNegocio'); 



// // Post Controllers
// const postNegocios = require('../controllers/postControllers/postNegocios');
// const postProductos = require('../controllers/postControllers/postProductos');
// const postUsuarios = require('../controllers/postControllers/postUsuarios');
// const loginUsuario = require('../controllers/postControllers/loginUsuario'); 
// const paymentIntent = require('../controllers/paymentControllers/paymentController');

// // Delete Controller
// const deleteUsuario = require('../controllers/deleteControllers/deleteUsuario');
// const deleteProducto = require('../controllers/deleteControllers/deleteProducto');
// const deleteNegocio = require('../controllers/deleteControllers/deleteNegocio');
// const auth = require('../middleware/authentication');

// // Configurar las rutas


// routes.get('/negocios', getNegocios); // Obtener la lista de negocios
// routes.get('/negocios/:id', getDetailNegocios); // Obtener detalles de un negocio específico
// routes.get('/productos', getProductos); // Obtener la lista de productos
// routes.get('/productos/:id', getDetailProductos); // Obtener detalles de un producto específico
// routes.get('/usuarios', auth(['admin']), getUsuarios); // Obtener la lista de usuarios solo si se tiene rol 'admin'
// routes.get('/negocios/:negocioId/productos', getProductosPorNegocio); // Obtener todos los productos de un negocio específico

// routes.post('/negocios', auth(['admin', 'socio']), postNegocios); // Crear Negocios solo si se tiene rol 'admin' o 'socio'
// routes.post('/productos', auth(['admin', 'socio']), postProductos); // Crear Productos solo si se tiene rol 'admin' o 'socio'
// routes.post('/usuarios', postUsuarios); // Crear Usuarios (No requiere autenticación)
// routes.post('/login', loginUsuario); // Login de usuarios (No requiere autenticación)
// routes.post('/create-payment-intent', paymentIntent); // Ruta para la pasarela Stripe

// routes.delete('/usuarios/:id', auth(['admin']), deleteUsuario); // Eliminar usuario solo si se tiene rol 'admin'
// routes.delete('/productos/:id', auth(['admin', 'socio']), deleteProducto); // Eliminar producto solo si se tiene rol 'admin' o 'socio'
// routes.delete('/negocios/:id', auth(['admin', 'socio']), deleteNegocio); // Eliminar negocio solo si se tiene rol 'admin' o 'socio'

// // Rutas para recuperación de entidades
// routes.post('/restore/usuarios/:id', auth(['admin']), (req, res) => recoverEntity(Usuario, req, res)); // Agregado: Ruta para restaurar usuarios
// routes.post('/restore/productos/:id', auth(['admin', 'socio']), (req, res) => recoverEntity(Producto, req, res)); // Agregado: Ruta para restaurar productos
// routes.post('/restore/pedidos/:id', auth(['admin']), (req, res) => recoverEntity(Pedido, req, res)); // Agregado: Ruta para restaurar pedidos
// routes.post('/restore/pedido-producto/:id', auth(['admin']), (req, res) => recoverEntity(Pedido_Producto, req, res)); // Agregado: Ruta para restaurar PedidoProducto
// routes.post('/restore/pagos/:id', auth(['admin']), (req, res) => recoverEntity(Pago, req, res)); // Agregado: Ruta para restaurar pagos
// routes.post('/restore/negocios/:id', auth(['admin', 'socio']), (req, res) => recoverEntity(Negocio, req, res)); // Agregado: Ruta para restaurar negocios



// module.exports = routes;


const express = require('express');
const routes = express.Router();
const auth = require('../middleware/authentication'); // Asegúrate de que la ruta sea correcta

const { Usuario, Producto, Pedido_Producto, Pedido, Pago, Negocio } = require('../db'); // Ajusta la ruta si es necesario

const recoverEntity = require('../controllers/common/recoverEntity');
// Importar todos los controladores 

//Get Controllers
const getDetailNegocios = require('../controllers/getControllers/getDetailNegocios');
const getDetailProductos = require('../controllers/getControllers/getDetailProductos');
const getNegocios = require('../controllers/getControllers/getNegocios');
const getProductos = require('../controllers/getControllers/getProductos');
const getUsuarios = require('../controllers/getControllers/getUsuarios');
const getProductosPorNegocio = require('../controllers/getControllers/getProductosPorNegocio'); // Importa el controlador de productos por negocio

//Post Controllers
const postNegocios = require('../controllers/postControllers/postNegocios');
const postProductos = require('../controllers/postControllers/postProductos');
const postUsuarios = require('../controllers/postControllers/postUsuarios');
const paymentIntent = require('../controllers/paymentControllers/paymentController');
const loginUsuario = require('../controllers/postControllers/loginUsuario');
const deleteProducto = require('../controllers/deleteControllers/deleteProducto');
const deleteUsuario = require('../controllers/deleteControllers/deleteUsuario');

// Configurar las rutas
routes.get('/negocios', getNegocios); // Obtener la lista de negocios
routes.get('/negocios/:id', getDetailNegocios); // Obtener detalles de un negocio específico
routes.get('/productos', getProductos); // Obtener la lista de productos
routes.get('/productos/:id', getDetailProductos); // Obtener detalles de un producto específico
routes.get('/usuarios', getUsuarios); // Obtener la lista de usuarios

// Nueva ruta para obtener productos por negocio
routes.get('/negocios/:negocioId/productos', getProductosPorNegocio); // Obtener todos los productos de un negocio específico

routes.post('/negocios', postNegocios);// Crear Negocios
routes.post('/productos', postProductos);//Crear Productos
routes.post('/usuarios', postUsuarios);//Crear usuarios
routes.post('/create-payment-intent', paymentIntent);//Ruta para la pasarela stripe
routes.post('/login', loginUsuario )

routes.delete('/:id', deleteProducto);
routes.delete('/usuarios/:id', deleteUsuario); 

// Rutas para recuperación de entidades sin autenticación
routes.post('/restore/usuarios/:id', (req, res) => recoverEntity(Usuario, req, res)); // Ruta para restaurar usuarios
routes.post('/restore/productos/:id', (req, res) => recoverEntity(Producto, req, res)); // Ruta para restaurar productos
routes.post('/restore/pedidos/:id', (req, res) => recoverEntity(Pedido, req, res)); // Ruta para restaurar pedidos
routes.post('/restore/pedido-producto/:id', (req, res) => recoverEntity(Pedido_Producto, req, res)); // Ruta para restaurar PedidoProducto
routes.post('/restore/pagos/:id', (req, res) => recoverEntity(Pago, req, res)); // Ruta para restaurar pagos
routes.post('/restore/negocios/:id', (req, res) => recoverEntity(Negocio, req, res)); // Ruta para restaurar negocios

module.exports = routes;

