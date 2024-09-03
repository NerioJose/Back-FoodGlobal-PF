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


module.exports = routes;

