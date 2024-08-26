// Importa el archivo `db.json` que contiene los productos hardcodeados.
const dbProducts = require("../../../db.json");

    // Importa el modelo `Producto` y la conexión `conn` desde el archivo de configuración de la base de datos (`db.js`).
    const { Producto } = require("../../models/productoModel");
const {conn} = require("../../db")
// Define una función asincrónica llamada `initialLoad`, que se encargará de cargar los productos en la base de datos si es necesario.

const initialLoad = async () => {
    try {
        console.log("Sincronizando base de datos...");
        await conn.sync({ alter: true });

        console.log("Consultando productos existentes...");
        const productosDb = await Producto.findAll();
        console.log(`Productos en la base de datos: ${productosDb.length}`);

        if (productosDb.length < dbProducts.length) {
            console.log("Cargando productos desde el archivo JSON...");
            const productos = dbProducts.map(producto => ({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precio: producto.precio,
                categoria: producto.categoria,
                imagen: producto.imagen
            }));

            console.log("Insertando productos en la base de datos...");
            await Producto.bulkCreate(productos);
            console.log("Productos cargados exitosamente.");
        } else {
            console.log("La base de datos ya tiene todos los productos.");
        }
    } catch (error) {
        console.error("Error during initial load:", error);
    }
};



module.exports = initialLoad;
