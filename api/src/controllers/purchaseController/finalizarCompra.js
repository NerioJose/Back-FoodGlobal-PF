const { Pedido, Pedido_Producto, Producto } = require('../../db');

const finalizarCompra = async (req, res) => {
  const { usuario_id, productos } = req.body; // Eliminé "total" para que no sea obligatorio

  // Verifica que todos los campos requeridos estén presentes
  if (!usuario_id || !productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ message: 'Faltan datos requeridos: usuario_id o productos.' });
  }

  try {
    // Calcular el total automáticamente sumando el precio de cada producto multiplicado por su cantidad
    let total = 0;
    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id);
      if (!producto) {
        return res.status(404).json({ message: `Producto ${item.producto_id} no encontrado.` });
      }
      total += producto.precio * item.cantidad;
    }

    // Crear el pedido
    const nuevoPedido = await Pedido.create({
      usuario_id,
      fecha: new Date(),
      total, // Ahora el total se calcula automáticamente
    });

    // Crear los detalles del pedido
    const detalles = productos.map(item => ({
      pedido_id: nuevoPedido.id,
      producto_id: item.producto_id,
      cantidad: item.cantidad,
    }));

    await Pedido_Producto.bulkCreate(detalles);

    // Actualizar el stock de los productos
    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id);
      await producto.update({ stock: producto.stock - item.cantidad });
    }

    return res.status(200).json({ message: 'Compra finalizada con éxito.' });
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
    return res.status(500).json({ message: 'Ocurrió un error al finalizar la compra.', error: error.message });
  }
};

module.exports = finalizarCompra;


