const express = require('express');
const routes = express.Router();

// Importar todos los controladores 
// Get Controllers
const getDetailNegocios = require('../controllers/getControllers/getDetailNegocios');
const getDetailProductos = require('../controllers/getControllers/getDetailProductos');
const getNegocios = require('../controllers/getControllers/getNegocios');
const getProductos = require('../controllers/getControllers/getProductos');
const getUsuarios = require('../controllers/getControllers/getUsuarios');
const getProductosPorNegocio = require('../controllers/getControllers/getProductosPorNegocio'); 

const welcomeController = require('../controllers/getControllers/welcomeController'); // Importar el controlador de welcome

// Post Controllers
const postNegocios = require('../controllers/postControllers/postNegocios');
const postProductos = require('../controllers/postControllers/postProductos');
const postUsuarios = require('../controllers/postControllers/postUsuarios');
const loginUsuario = require('../controllers/postControllers/loginUsuario'); 
const paymentIntent = require('../controllers/paymentControllers/paymentController');

// Delete Controller
const deleteUsuario = require('../controllers/deleteControllers/deleteUsuario');
const deleteProducto = require('../controllers/deleteControllers/deleteProducto');
const deleteNegocio = require('../controllers/deleteControllers/deleteNegocio');
const auth = require('../middleware/authentication');

// Configurar las rutas

// Nueva ruta para /welcome
routes.get('/welcome', welcomeController);

routes.get('/negocios', getNegocios); // Obtener la lista de negocios
routes.get('/negocios/:id', getDetailNegocios); // Obtener detalles de un negocio específico
routes.get('/productos', getProductos); // Obtener la lista de productos
routes.get('/productos/:id', getDetailProductos); // Obtener detalles de un producto específico
routes.get('/usuarios', auth(['admin']), getUsuarios); // Obtener la lista de usuarios solo si se tiene rol 'admin'
routes.get('/negocios/:negocioId/productos', getProductosPorNegocio); // Obtener todos los productos de un negocio específico

routes.post('/negocios', auth(['admin', 'socio']), postNegocios); // Crear Negocios solo si se tiene rol 'admin' o 'socio'
routes.post('/productos', auth(['admin', 'socio']), postProductos); // Crear Productos solo si se tiene rol 'admin' o 'socio'
routes.post('/usuarios', postUsuarios); // Crear Usuarios (No requiere autenticación)
routes.post('/login', loginUsuario); // Login de usuarios (No requiere autenticación)
routes.post('/create-payment-intent', paymentIntent); // Ruta para la pasarela Stripe

routes.delete('/usuarios/:id', auth(['admin']), deleteUsuario); // Eliminar usuario solo si se tiene rol 'admin'
routes.delete('/productos/:id', auth(['admin', 'socio']), deleteProducto); // Eliminar producto solo si se tiene rol 'admin' o 'socio'
routes.delete('/negocios/:id', auth(['admin', 'socio']), deleteNegocio); // Eliminar negocio solo si se tiene rol 'admin' o 'socio'

module.exports = routes;

