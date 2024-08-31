// controllers/getControllers/welcomeController.js

const welcomeController = (req, res) => {
    // Aquí puedes personalizar la lógica de bienvenida, por ejemplo:
    if (req.user) {
      res.send(`Welcome back, ${req.user.name}!`);
    } else {
      res.send('Welcome to the application!');
    }
  };
  
  module.exports = welcomeController;
  