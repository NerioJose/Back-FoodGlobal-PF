const { Pedido, Pedido_Producto, Producto } = require('../../db');

// Controlador para actualizar el estado del pedido
const actualizarEstadoPedido = async (req, res) => {
  const { id } = req.params;  // ID del pedido
  const { nuevoEstado } = req.body;  // Estado al que se va a actualizar

  try {
    // Buscar el pedido por ID e incluir los productos asociados
    const pedido = await Pedido.findByPk(id, {
      include: [{
        model: Pedido_Producto, // Incluir los detalles del pedido (productos)
        as: 'productos_pedido',
        include: {
          model: Producto, // Incluir los detalles del producto en cada entrada
          as: 'producto',
          attributes: ['nombre', 'precio'] // Solo incluir nombre y precio de los productos
        }
      }]
    });

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Actualizar el estado del pedido
    pedido.estado = nuevoEstado;
    await pedido.save(); // Guardar los cambios en la base de datos

    // Estructurar la respuesta, incluyendo productos y sus detalles
    const respuesta = {
      id: pedido.id,
      usuario_id: pedido.usuario_id,
      fecha: pedido.fecha,
      total: pedido.total,
      tipo_entrega: pedido.tipo_entrega,
      estado: pedido.estado,
      productos: pedido.productos_pedido.map((detalle) => ({
        producto_id: detalle.producto_id,
        nombre: detalle.producto.nombre,
        cantidad: detalle.cantidad,
        precio: detalle.producto.precio
      }))
    };

    res.status(200).json({
      message: 'Estado del pedido actualizado',
      pedido: respuesta
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};

module.exports = {
  actualizarEstadoPedido,
};
