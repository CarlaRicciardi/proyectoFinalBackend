const logger = require('../config/logger');
const config = require('../config/config.js');
const nodemailer = require('nodemailer');

const NODEMAILER_MAIL = process.env.NODEMAILER_MAIL;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS
const ADMIN_MAIL = process.env.ADMINMAIL

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: NODEMAILER_MAIL,
    pass: NODEMAILER_PASS,
  },
});

const sendOrderMailToAdmin = async (productsCart, user, date, state, orderNumber) => {
  const listOrder = productsCart.map((item) => `<li> ${item.title}   $${item.price}   x   ${item.quantity} u.</li>`).join(' ');

  const bodyOrder = `<div>
    <p>Nuevo pedido de ${user.name} ( ${user.username} )</p>
    <p>Productos:</p>
    <ul>
        ${listOrder}
    </ul>
    <p> Nro. Orden:  ${orderNumber} </p>
    <p> Fecha: ${date} </p>
    <p> Estado: ${state} </p>
    </div>`;

  const mailOptionsNewOrder = {
    from: 'App Tienda',
    to: ADMIN_MAIL,
    subject: `Nuevo pedido de ${user.nombre} ( ${user.username} )`,
    html: bodyOrder,
  };

  try {
    const info = await transporter.sendMail(mailOptionsNewOrder);
    logger.log('info', info);
  } catch (err) {
    logger.log('error', err);
  }
};

const sendNewRegisterToAdmin = async (user) => {
  const mailOptionsNewUser = {
    from: 'App Tienda',
    to: config.ADMIN_MAIL,
    subject: 'Nuevo registro',
    html: `<div>
          <p>Nuevo usuario registrado:</p>
            <ul>
              <li>Nombre: ${user.name} </li>
              <li>>Email: ${user.username}</li> 
              <li>Edad: ${user.age}</li>  
              <li>Dirección: ${user.address}</li>  
              <li>Teléfono: ${user.phone}</li> 
              <li> <img src=" ${user.url}" alt=" ${user.name}" /> </li> 
            </ul>
            </div>`,
  };
  try {
    const info = await transporter.sendMail(mailOptionsNewUser);
    logger.log('info', info);
  } catch (err) {
    logger.log('error', err);
  }
};

module.exports = { sendOrderMailToAdmin, sendNewRegisterToAdmin, transporter };
