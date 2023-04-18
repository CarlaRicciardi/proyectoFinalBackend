// const config = require("../config/config.js");
// const PERSISTENCE_USERS = config.PERSISTENCE_USERS;
// const factoryDaoOrders = require("../persistence/daos/orders/factoryDaoOrders.js");
// const DAOshopOrders = new factoryDaoOrders(PERSISTENCE_USERS);

// // const {
// //   SendOrderWhatsappToAdmin,
// //   sendOrderSMSToUser,
// // } = require("../external-services/twilio");
// // const { sendOrderMailToAdmin } = require("../external-services/nodemailer");

// // const saveShopOrderAndSend = async (productos, user) => {
// //   const fecha = new Date().toLocaleDateString() + new Date().toTimeString();
// //   const orderNumber = await DAOshopOrders.getOrderNumber();
// //   const estado = "generada";
// //   const newOrder = {
// //     items: [productos],
// //     nroOrden: orderNumber,
// //     fecha: fecha,
// //     estado: estado,
// //     emailUsuario: user.username,
// //   };
// //   const saveOrder = await DAOshopOrders.saveNew(newOrder);
// //   const sendEmail = await sendOrderMailToAdmin(
// //     productos,
// //     user,
// //     fecha,
// //     estado,
// //     orderNumber
// //   );
// //   const sendWhatsapp = await SendOrderWhatsappToAdmin(user);
// //   const sendSMS = await sendOrderSMSToUser(user, orderNumber);
// // };

// // module.exports = saveShopOrderAndSend;
