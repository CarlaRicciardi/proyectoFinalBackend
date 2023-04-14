// const logger = require('../config/logger.js');
// const config = require('../config/config.js');
// const nodemailer = require('nodemailer');

// const ADMIN_MAIL = process.env.ADMIN_MAIL;

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 587,
//   auth: {
//     user: config.TRANSPORTERUSER,
//     pass: config.TRANSPORTERAUTH,
//   },
// });

// const sendOrderMailToAdmin = async (productos, user, fecha, estado, orderNumber) => {
//   const listaPedido = productos.map((item) => `<li> ${item.title}   $${item.price}   x   ${item.quantity} u.</li>`).join(' ');

//   const bodyPedido = `<div>
//     <p>Nuevo pedido de ${user.nombre} ( ${user.username} )</p>
//     <p>Productos:</p>
//     <ul>
//         ${listaPedido}
//     </ul>
//     <p> Nro. Orden:  ${orderNumber} </p>
//     <p> Fecha: ${fecha} </p>
//     <p> Estado: ${estado} </p>
//     </div>`;

//   const mailOptionsNuevoPedido = {
//     from: 'App Tienda',
//     to: config.ADMINMAIL,
//     subject: `Nuevo pedido de ${user.nombre} ( ${user.username} )`,
//     html: bodyPedido,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptionsNuevoPedido);
//     logger.log('info', info);
//   } catch (err) {
//     logger.log('error', err);
//   }
// };

// const sendNewRegisterToAdmin = async (user) => {
//   const mailOptionsNuevoUsuario = {
//     from: 'App Tienda',
//     to: config.ADMINMAIL,
//     subject: 'Nuevo registro',
//     html: `<div>
//           <p>Nuevo usuario registrado:</p>
//             <ul>
//               <li>Nombre: ${user.nombre} </li>
//               <li>Apellido: ${user.apellido} </li>
//               <li>>Email: ${user.username}</li> 
//               <li>Edad: ${user.edad}</li>  
//               <li>Dirección: ${user.direccion}</li>  
//               <li>Teléfono: ${user.telefono}</li> 
//               <li> <img src=" ${user.avatar}" alt=" ${user.nombre}" /> </li> 
//             </ul>
//             </div>`,
//   };
//   try {
//     const info = await transporter.sendMail(mailOptionsNuevoUsuario);
//     logger.log('info', info);
//   } catch (err) {
//     logger.log('error', err);
//   }
// };

// module.exports = { sendOrderMailToAdmin, sendNewRegisterToAdmin, transporter };
