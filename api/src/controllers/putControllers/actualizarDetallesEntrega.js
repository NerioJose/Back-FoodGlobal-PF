const { Pedido } = require('../../db');

const actualizarDetallesEntrega = async (req, res) => {
  const { tipo_entrega, datos_entrega } = req.body;
  const { pedido_id } = req.params; // Obtener el pedido_id desde los parámetros de la ruta

  try {
    const pedido = await Pedido.findByPk(pedido_id);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido no encontrado.' });
    }

    // Verificar el tipo de entrega y los datos requeridos
    if (tipo_entrega === 'retiro') {
      // Verificar que los datos necesarios para la entrega por retiro estén presentes
      if (!datos_entrega.nombre_persona || !datos_entrega.documento_identidad) {
        return res.status(400).json({ message: 'Faltan datos para la entrega por retiro.' });
      }

      // Actualizar solo los datos para el retiro
      await pedido.update({
        tipo_entrega: 'retiro',
        nombre_persona: datos_entrega.nombre_persona,
        documento_identidad: datos_entrega.documento_identidad,
        ciudad: null, // Limpiar los datos de domicilio si antes fue seleccionado
        direccion_envio: null,
        codigo_postal: null,
      });

    } else if (tipo_entrega === 'domicilio') {
      // Verificar que los datos necesarios para la entrega a domicilio estén presentes
      if (!datos_entrega.ciudad || !datos_entrega.direccion_envio || !datos_entrega.codigo_postal) {
        return res.status(400).json({ message: 'Faltan datos para la entrega a domicilio.' });
      }

      // Actualizar solo los datos para la entrega a domicilio
      await pedido.update({
        tipo_entrega: 'domicilio',
        ciudad: datos_entrega.ciudad,
        direccion_envio: datos_entrega.direccion_envio,
        codigo_postal: datos_entrega.codigo_postal,
        nombre_persona: null, // Limpiar los datos de retiro si antes fue seleccionado
        documento_identidad: null,
      });

    } else {
      // Si el tipo de entrega no es válido, devolver un error
      return res.status(400).json({ message: 'Tipo de entrega no válido.' });
    }

    // Devolver una respuesta exitosa
    return res.status(200).json({ message: 'Detalles de entrega actualizados correctamente.' });

  } catch (error) {
    // Manejo de errores
    return res.status(500).json({ message: 'Error al actualizar los detalles de entrega.', error: error.message });
  }
};

module.exports = { actualizarDetallesEntrega };
