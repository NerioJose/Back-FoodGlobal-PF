const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport'); // IMPORTAR PASSPORT
const session = require('express-session'); // IMPORTAR EXPRESS-SESSION
const routes = require('./routes/index.js');
const authRoutes = require('./routes/auth.routes.js'); // IMPORTAR RUTAS DE AUTENTICACIÓN
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('./db.js');
require('./passport.js'); // IMPORTAR CONFIGURACIÓN DE PASSPORT

const server = express();

server.name = 'API';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: 'foodglobal',  // Reemplaza con tu cloud_name de Cloudinary
  api_key: '864176186175449',       // Reemplaza con tu api_key de Cloudinary
  api_secret: '-vF37gciGAv9ICq-Gw0TLEkRej0'  // Reemplaza con tu api_secret de Cloudinary
});

// Configurar Multer para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'foodglobal',  // Cambia por el nombre de la carpeta que deseas usar en Cloudinary
    allowed_formats: ['jpg', 'web', 'png'], // Formatos permitidos
  },
});

const upload = multer({ storage: storage });


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configuración de CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Configuración de sesión y Passport
server.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
server.use(passport.initialize());
server.use(passport.session());

server.post('/upload', upload.single('imagen'), (req, res) => {
  try {
    // Verifica si req.file está presente
    if (!req.file) {
      return res.status(400).send('No se subió ningún archivo.');
    }
    
    // Devuelve la URL pública de la imagen subida a Cloudinary
    res.json({ url: req.file.path });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res.status(500).send('Error subiendo el archivo.');
  }
});
server.use('/', routes);
server.use('/', authRoutes); // Asegúrate de incluir las rutas de autenticación

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
