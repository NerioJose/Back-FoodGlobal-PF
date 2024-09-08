// controllers/putController/pedidoController.js

const { Pedido } = require('../..//db');

// Controlador para actualizar el estado del pedido
const actualizarEstadoPedido = async (req, res) => {
  const { id } = req.params;  // ID del pedido
  const { nuevoEstado } = req.body;  // Estado al que se va a actualizar

  try {
    // Buscar el pedido por ID
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Actualizar el estado del pedido
    pedido.estado = nuevoEstado;
    await pedido.save();

    res.status(200).json({ message: 'Estado del pedido actualizado', pedido });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};

module.exports = {
  actualizarEstadoPedido,
};
