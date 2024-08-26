const { Negocio } = require('../../db');



const deleteNegocio = async (req, res) => {
    try {
        // Extraemos el `id` del negocio de los parámetros de la URL (req.params).
        // Este `id` es el que identifica al negocio que queremos eliminar.
        const { id } = req.params;

        // Usamos el método `findByPk` para buscar un negocio en la base de datos por su `id`.
        // `findByPk` significa "find by primary key" (buscar por clave primaria).
        const negocio = await Negocio.findByPk(id);

        // Si no se encuentra un negocio con el `id` proporcionado, enviamos una respuesta con estado 404.
        // Esto significa que el negocio no fue encontrado.
        if (!negocio) {
            return res.status(404).json({ message: 'Negocio no encontrado.' });
        }

        // Si el negocio existe, usamos el método `destroy` para eliminarlo de la base de datos.
        await negocio.destroy();

        // Si la eliminación fue exitosa, enviamos una respuesta con estado 200 y un mensaje de éxito.
        return res.status(200).json({ message: 'Negocio eliminado exitosamente.' });
    } catch (error) {
        // Si ocurre algún error durante el proceso, lo capturamos y lo mostramos en la consola.
        console.error(error);

        // Además, enviamos una respuesta con estado 500 indicando un error en el servidor.
        return res.status(500).json({ message: 'Ocurrió un error al eliminar el negocio.' });
    }
};

module.exports = deleteNegocio;
