const config = require('../config/config.js');
const PERSISTENCE_USERS = config.PERSISTENCE_USERS;
const factoryDaoOrders = require('../persistence/daos/orders/factoryDaoOrders.js');
const DAOshopOrders = new factoryDaoOrders(PERSISTENCE_USERS);

const { sendOrderMailToAdmin } = require('../externalServices/nodemailer.js');

const saveShopOrderAndSend = async (productsCart, user) => {
  console.log('productsCart en service shoporders', productsCart);
  const date = new Date().toLocaleDateString() + new Date().toTimeString();
  const orderNumber = await DAOshopOrders.getOrderNumber();
  const state = 'generada';
  const newOrder = {
    items: productsCart,
    numOrden: orderNumber,
    date: date,
    state: state,
    emailUser: user.username,
  };
  console.log('new order en service shiporders', newOrder); 
  const saveOrder = await DAOshopOrders.saveNew(newOrder);
  console.log('saveorder en service shoporders:', saveOrder); 
  const sendEmail = await sendOrderMailToAdmin(productsCart, user, date, state, orderNumber);
};

module.exports = saveShopOrderAndSend;
