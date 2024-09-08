const { conn: sequelize, Pedido, Pedido_Producto, Producto } = require('../../db');

const finalizarCompra = async (req, res) => {
  const { usuario_id, productos, tipo_entrega, estado = 'pendiente' } = req.body;

  // Verifica que todos los campos requeridos estén presentes
  if (!usuario_id || !productos || !Array.isArray(productos) || productos.length === 0 || !tipo_entrega) {
    return res.status(400).json({ 
      message: 'Faltan datos requeridos: usuario_id, productos o tipo_entrega.' 
    });
  }

  const transaction = await sequelize.transaction(); // Inicia la transacción

  try {
    // Calcular el total automáticamente sumando el precio de cada producto multiplicado por su cantidad
    let total = 0;
    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id, { transaction });
      if (!producto) {
        await transaction.rollback(); // Revertir transacción si el producto no se encuentra
        return res.status(404).json({ message: `Producto ${item.producto_id} no encontrado.` });
      }
      if (producto.stock < item.cantidad) {
        await transaction.rollback(); // Revertir transacción si no hay suficiente stock
        return res.status(400).json({ message: `No hay suficiente stock para el producto ${item.producto_id}.` });
      }
      total += producto.precio * item.cantidad;
    }

    // Crear el pedido con tipo_entrega obligatorio
    const nuevoPedido = await Pedido.create({
      usuario_id,
      fecha: new Date(),
      total,
      tipo_entrega, // Obligatorio
      estado,       // Se usa el valor recibido o 'pendiente' por defecto
    }, { transaction });

    // Crear los detalles del pedido
    const detalles = productos.map(item => ({
      pedido_id: nuevoPedido.id,
      producto_id: item.producto_id,
      cantidad: item.cantidad,
    }));

    await Pedido_Producto.bulkCreate(detalles, { transaction });

    // Actualizar el stock de los productos
    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id, { transaction });
      await producto.update({ stock: producto.stock - item.cantidad }, { transaction });
    }

    // Confirmar la transacción
    await transaction.commit();

    return res.status(200).json({
      message: 'Compra finalizada con éxito.',
      pedido: {
        id: nuevoPedido.id,
        usuario_id: nuevoPedido.usuario_id,
        fecha: nuevoPedido.fecha,
        total: nuevoPedido.total,
        tipo_entrega: nuevoPedido.tipo_entrega,  // Obligatorio
        estado: nuevoPedido.estado,
        productos: productos.map(item => ({
          producto_id: item.producto_id,
          cantidad: item.cantidad,
        })),
      },
    });
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error
    console.error('Error al finalizar la compra:', error);
    return res.status(500).json({ message: 'Ocurrió un error al finalizar la compra.', error: error.message });
  }
};

module.exports = finalizarCompra;
