// controllers/common/recoverEntity.js

const recoverEntity = async (model, req, res) => {
  const { id } = req.params;

  try {
    // Restaurar la entidad usando el método `restore` de Sequelize
    const result = await model.restore({
      where: { id },
    });

    if (result[0] === 0) {
      return res.status(404).json({ message: 'Entidad no encontrada o ya restaurada.' });
    }

    // Consulta la entidad después de restaurar
    const recoveredEntity = await model.findByPk(id);

    // Verifica el estado del producto
    if (!recoveredEntity) {
      return res.status(404).json({ message: 'Entidad no encontrada después de restaurar.' });
    }

    return res.status(200).json({
      message: 'Entidad restaurada con éxito.',
      entity: recoveredEntity
    });
  } catch (error) {
    console.error('Error al restaurar entidad:', error);
    return res.status(500).json({ message: 'Ocurrió un error al restaurar la entidad.', error: error.message });
  }
};

module.exports = recoverEntity;
