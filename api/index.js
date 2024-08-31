//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js'); // Asegúrate de que la ruta sea correcta
const initialLoad = require('./src/controllers/getControllers/productController.js');

// Sincronizar todos los modelos y luego iniciar el servidor
conn.sync({ alter: true }).then( async() => {
  // await initialLoad();  // Llamar a la función initialLoad para cargar los productos

   // Iniciar el servidor en el puerto 3001
  server.listen(3001, () => {
    console.log('listening at 3001'); 
  });
});
