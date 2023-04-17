const logger = require('../config/logger.js');
const config = require('../config/config.js');
const PERSISTENCE = config.PERSISTENCE;
const FactoryDaoCarts = require('../persistence/daos/carts/factoryDaoCarts.js');
const DaoCarts = new FactoryDaoCarts(PERSISTENCE);

const { saveCartIdInUser, updateEmptyCartInUser, getUser } = require('./users.js');
// const saveShopOrderAndSend = require("../services/shop-orders");

const createCart = async (username) => {
  try {
    const idCart = await DaoCarts.saveNew();
    const userWithCart = await saveCartIdInUser(username, idCart);
  } catch (err) {
    logger.log('error createCart', err);
  }
};

const addProductToCart = async (objProd, idCart) => {
  const idProd = objProd._id;
  const isProd = await DaoCarts.getProdInCart(idCart, idProd);
  if (isProd) {
    logger.log('info', `isProd ${isProd}`);
    let cantAntes = parseInt(isProd.quantity);
    let cantSum = parseInt(objProd.quantity);
    await DaoCarts.addRepeatedProd(idProd, cantAntes, cantSum, idCart);
  } else {
    try {
      await DaoCarts.AddProdToCart(objProd, idCart);
    } catch (err) {
      logger.log('error', 'no se pudo agregar producto al carrito');
    }
  }
};

const getProducts = async (id) => {
  const productList = await DaoCarts.getProductList(id);
  if (productList) {
    return productList;
  } else {
    return false;
  }
};

const deleteCart = async (idCart, username) => {
  const deleteCart = await DaoCarts.deleteById(idCart);
  const cartEmpty = await updateEmptyCartInUser(username);
};

const deleteProdFromCart = async (id, idProd) => {
  const delProd = await DaoCarts.deleteProd(id, idProd);
  return 'prod eliminado';
};

// const confirmOrder = async (username, idCart) => {
//   const user = await getUser(username);
//   const products = await DaoCarts.getProductList(idCart);
// const guardarOrdenYMandarMensajes = await saveShopOrderAndSend(
//   productos,
//   user
// );
// };

module.exports = {
  createCart,
  deleteCart,
  getProducts,
  deleteProdFromCart,
  addProductToCart,
  // confirmOrder,
};