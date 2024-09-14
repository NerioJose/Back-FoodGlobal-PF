const corsOptions = {
  // origin: 'https://front-food-global-pf.vercel.app/',
  origin: 'http://localhost:3000/', // Reemplaza con el dominio de tu frontend en Vercel
  credentials: true, // Habilita las cookies y credenciales
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], // Cabeceras permitidas
};

module.exports = corsOptions;