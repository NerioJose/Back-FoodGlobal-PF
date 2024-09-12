const { conn: sequelize, Pedido, Pedido_Producto, Producto, Usuario } = require('../../db');
const enviarCorreo = require('../../services/mailService'); // Importa el servicio de correo

const finalizarCompra = async (req, res, io) => {
  const { usuario_id, productos, tipo_entrega, estado = 'pendiente' } = req.body;

  if (!usuario_id || !productos || !Array.isArray(productos) || productos.length === 0 || !tipo_entrega) {
    return res.status(400).json({ message: 'Faltan datos requeridos: usuario_id, productos o tipo_entrega.' });
  }

  const transaction = await sequelize.transaction();

  try {
    let total = 0;
    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id, { transaction });
      if (!producto) {
        await transaction.rollback();
        return res.status(404).json({ message: `Producto ${item.producto_id} no encontrado.` });
      }
      if (producto.stock < item.cantidad) {
        await transaction.rollback();
        return res.status(400).json({ message: `No hay suficiente stock para el producto ${item.producto_id}.` });
      }
      total += producto.precio * item.cantidad;
    }

    const nuevoPedido = await Pedido.create({
      usuario_id,
      fecha: new Date(),
      total,
      tipo_entrega,
      estado,
    }, { transaction });

    const detalles = productos.map(item => ({
      pedido_id: nuevoPedido.id,
      producto_id: item.producto_id,
      cantidad: item.cantidad,
    }));

    await Pedido_Producto.bulkCreate(detalles, { transaction });

    for (const item of productos) {
      const producto = await Producto.findByPk(item.producto_id, { transaction });
      await producto.update({ stock: producto.stock - item.cantidad }, { transaction });
    }

    // Confirmar la transacción
    await transaction.commit();

    // Obtener el correo del usuario
    const usuario = await Usuario.findByPk(usuario_id);

    // Preparar el correo de confirmación
    const asunto = 'Compra exitosa - Tu pedido está en proceso';
    const mensaje = `Gracias por tu compra, ${usuario.nombre}. Tu pedido está en proceso de armado.\n\nDetalles del pedido:\nPedido ID: ${nuevoPedido.id}\nFecha: ${nuevoPedido.fecha}\nTotal: ${nuevoPedido.total}.\nTipo de entrega: ${nuevoPedido.tipo_entrega}.\n\nTe avisaremos cuando esté listo para ser enviado.`;

    // Enviar el correo al usuario y emitir el evento después del commit
    try {
      await enviarCorreo(usuario.email, asunto, mensaje);
      console.log(`Correo enviado con éxito a ${usuario.email}`);

      // Emitir un evento con socket.io después del commit
      io.emit(`pedido_${usuario_id}`, { 
        message: 'Compra finalizada con éxito. Tu pedido está en proceso de armado.', 
        pedido: nuevoPedido 
      });
    } catch (error) {
      console.error('Error al enviar el correo o emitir evento:', error);
      // Nota: Aquí no puedes hacer rollback porque la transacción ya está confirmada
    }

    return res.status(200).json({
      message: 'Compra finalizada con éxito.',
      pedido: {
        id: nuevoPedido.id,
        usuario_id: nuevoPedido.usuario_id,
        fecha: nuevoPedido.fecha,
        total: nuevoPedido.total,
        tipo_entrega: nuevoPedido.tipo_entrega,
        estado: nuevoPedido.estado,
        productos: productos.map(item => ({
          producto_id: item.producto_id,
          cantidad: item.cantidad,
        })),
      },
    });
  } catch (error) {
    await transaction.rollback(); // Revertir la transacción en caso de error antes del commit
    console.error('Error al finalizar la compra:', error);
    return res.status(500).json({ message: 'Ocurrió un error al finalizar la compra.', error: error.message });
  }
};

module.exports = finalizarCompra;
