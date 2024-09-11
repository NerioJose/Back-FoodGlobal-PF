//?  Usa el transportador importado desde emailConfig.js para enviar correos.


const transporter = require('./emailConfig'); // Asegúrate de que la ruta sea correcta

const enviarCorreo = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

module.exports = enviarCorreo;