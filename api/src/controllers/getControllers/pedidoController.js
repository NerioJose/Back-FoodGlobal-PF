// controllers/getController/pedidoController.js

const { Pedido } = require('../../db');

// Función para obtener un pedido por ID
const obtenerPedidoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(200).json({
      id: pedido.id,
      usuario_id: pedido.usuario_id,
      fecha: pedido.fecha,
      total: pedido.total,
      tipo_entrega: pedido.tipo_entrega,
      estado: pedido.estado,  // Muestra el estado actual del pedido
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

module.exports = {
  obtenerPedidoPorId,
};
