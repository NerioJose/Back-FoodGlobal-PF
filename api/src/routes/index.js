const express = require('express');
const routes = express.Router();


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

//Update Controllers
const updateNegocio = require('../controllers/updateControllers/updateNegocio');
const updateUsuario = require('../controllers/updateControllers/updateUsuario');
const updateProducto = require('../controllers/updateControllers/updateProducto');

// Block Controllers
const bloquearNegocio = require('../controllers/blockcontrollers/blockNegocio'); // Importa el controlador de bloqueo de negocio
const bloquearUsuario = require('../controllers/blockcontrollers/blockUsuario');
const bloquearProducto = require('../controllers/blockcontrollers/blockProducto');


// Configurar las rutas
routes.get('/negocios', getNegocios); // Obtener la lista de negocios
routes.get('/negocios/:id', getDetailNegocios); // Obtener detalles de un negocio específico
routes.get('/productos', getProductos); // Obtener la lista de productos
routes.get('/productos/:id', getDetailProductos); // Obtener detalles de un producto específico
routes.get('/usuarios', getUsuarios); // Obtener la lista de usuarios

// Nueva ruta para obtener productos por negocio
routes.get('/negocios/:negocioId/productos', getProductosPorNegocio); // Obtener todos los productos de un negocio específico

routes.post('/negocios', postNegocios); // Crear Negocios
routes.post('/productos', postProductos); // Crear Productos
routes.post('/usuarios', postUsuarios); // Crear usuarios
routes.post('/create-payment-intent', paymentIntent); // Ruta para la pasarela stripe
routes.post('/login', loginUsuario);

routes.delete('/:id', deleteProducto);

routes.delete('/usuarios/:id', deleteUsuario);

// Rutas para recuperación de entidades sin autenticación
routes.post('/restore/usuarios/:id', (req, res) => recoverEntity(Usuario, req, res)); // Ruta para restaurar usuarios
routes.post('/restore/productos/:id', (req, res) => recoverEntity(Producto, req, res)); // Ruta para restaurar productos
routes.post('/restore/pedidos/:id', (req, res) => recoverEntity(Pedido, req, res)); // Ruta para restaurar pedidos
routes.post('/restore/pedido-producto/:id', (req, res) => recoverEntity(Pedido_Producto, req, res)); // Ruta para restaurar PedidoProducto
routes.post('/restore/pagos/:id', (req, res) => recoverEntity(Pago, req, res)); // Ruta para restaurar pagos
routes.post('/restore/negocios/:id', (req, res) => recoverEntity(Negocio, req, res)); // Ruta para restaurar negocios


// Nueva ruta para bloquear negocio
routes.put('/negocios/:id/bloquear', bloquearNegocio); // Ruta para bloquear negocio
routes.post('/block/usuarios/:id', bloquearUsuario); // Bloquear un usuario
routes.post('/block/productos/:id', bloquearProducto); // Bloquear un producto

//Rutas para editar datos de Negocios, productos y usuarios
routes.put('/negocios/:id', updateNegocio);
routes.put('/usuarios/:id', updateUsuario);
routes.put('/productos/:id', updateProducto);


module.exports = routes;