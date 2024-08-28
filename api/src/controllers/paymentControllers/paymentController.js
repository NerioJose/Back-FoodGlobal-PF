const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // El monto debe estar en centavos
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error); // Para registrar el error en la consola
    res.status(500).send({ error: error.message });
  }
};

module.exports = paymentIntent;
