const { Producto } = require('../../db');


const deleteProducto = async (req, res) => {


    try {
        const { id } = req.params;
        // Extrae el 'id' del producto desde los parámetros de la solicitud.


        // Intentar encontrar el producto por ID
        const producto = await Producto.findByPk(id);
        // Utiliza el método 'findByPk' de Sequelize para buscar un producto por su clave primaria (Primary Key) en la base de datos.
        // 'findByPk' es un método asíncrono, por lo que se usa 'await' para esperar a que la búsqueda se complete.
        // Si el producto con el 'id' proporcionado existe, se almacenará en la variable 'producto'.
        // Si no existe, 'producto' será 'null'.

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
            // Si 'producto' es 'null' (es decir, si no se encontró un producto con ese 'id'),
            // se envía una respuesta con un estado 404 (No encontrado) y un mensaje indicando que el producto no fue encontrado.
            // El 'return' asegura que el resto del código no se ejecute.
        }

        // Eliminar el producto
        await producto.destroy();
        // Si se encontró el producto, se llama al método 'destroy' en la instancia del producto.
        // 'destroy' elimina el registro del producto de la base de datos.
        // Como 'destroy' es asíncrono, también se usa 'await' para esperar a que la eliminación se complete.

        return res.status(200).json({ message: 'Producto eliminado exitosamente.' });
        // Si la eliminación fue exitosa, se envía una respuesta con un estado 200 (OK) y un mensaje indicando que el producto fue eliminado con éxito.

    } catch (error) {
        console.error(error);
        // Si ocurre algún error durante el proceso, se captura con 'catch' y se imprime en la consola para depuración.

        return res.status(500).json({ message: 'Ocurrió un error al eliminar el producto.' });
        // Si ocurre un error, se envía una respuesta con un estado 500 (Error interno del servidor) y un mensaje indicando que hubo un problema al intentar eliminar el producto.
    }
};

module.exports = deleteProducto;

