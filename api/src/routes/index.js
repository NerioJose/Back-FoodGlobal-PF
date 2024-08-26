const express = require('express');
const routes = express.Router();

// Importar todos los controladores 

//Get Controllers
const getDetailNegocios = require('../controllers/getControllers/getDetailNegocios');
const getDetailProductos = require('../controllers/getControllers/getDetailProductos');
const getNegocios = require('../controllers/getControllers/getNegocios');
const getProductos = require('../controllers/getControllers/getProductos');
const getUsuarios = require('../controllers/getControllers/getUsuarios');

//Post Controllers
const postNegocios = require('../controllers/postControllers/postNegocios');
const postProductos = require('../controllers/postControllers/postProductos');
const postUsuarios = require('../controllers/postControllers/postUsuarios');
const loginUsuario = require('../controllers/postControllers/loginUsuario'); // Importa el controlador de login

// Delete Controller
const deleteUsuario = require('../controllers/deleteControllers/deleteUsuario'); // Importa el controlador de eliminación
const deleteProducto = require('../controllers/deleteControllers/deleteProducto'); // NUEVO: Importa el controlador de eliminación de producto
const deleteNegocio = require('../controllers/deleteControllers/deleteNegocio'); // NUEVO: Importa el controlador de eliminación de negocio

// Configurar las rutas
routes.get('/negocios', getNegocios); // Obtener la lista de negocios
routes.get('/negocios/:id', getDetailNegocios); // Obtener detalles de un negocio específico
// Obtener negocios por nombre (nuevo)
// routes.get('/negocios/search', getNegociosByNombre); // Nueva ruta para buscar negocios por nombre

routes.get('/productos', getProductos); // Obtener la lista de productos
routes.get('/productos/:id', getDetailProductos); // Obtener detalles de un producto específico por id
// Obtener productos por nombre (nuevo)
// routes.get('/productos/search', getProductosByNombre); // Nueva ruta para buscar productos por nombre

routes.get('/usuarios', getUsuarios); // Obtener la lista de usuarios
// Obtener usuarios por nombre (nuevo)
// routes.get('/usuarios/search', getUsuariosByNombre); // Nueva ruta para buscar usuarios por nombre

routes.post('/negocios', postNegocios);// Crear Negocios
routes.post('/productos', postProductos);//Crear Productos
routes.post('/usuarios', postUsuarios);
routes.post('/login', loginUsuario); // Nueva ruta para login de usuarios

// Ruta para eliminar un usuario
routes.delete('/usuarios/:id', deleteUsuario); // Elimina un usuario por ID

// NUEVO: Ruta para eliminar un producto
routes.delete('/productos/:id', deleteProducto); // Elimina un producto por ID

// Ruta para eliminar un negocio
routes.delete('/negocios/:id', deleteNegocio); // Elimina un negocio por ID

module.exports = routes;
