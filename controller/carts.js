const logger = require('../config/logger.js');
const service = require('../service/carts.js');

const createCart = async (req, res) => {
  const { username } = req.user;
  await service.createCart(username);
  res.redirect('/api/products');
  logger.log('info', '/api/cart - POST');
};

const addProductToCart = async (req, res) => {
  const objProd = {
    _id: req.body.idprod,
    title: req.body.title,
    price: req.body.price,
    thumbnail: req.body.thumbnail,
    quantity: req.body.units,
  };
  const idCart = req.user.cartActual;
  await service.addProductToCart(objProd, idCart);
  res.redirect(`/api/cart/${idCart}/products`);
  logger.log('info', '/api/cart/:id - POST');
};

const getProducts = async (req, res) => {
  try {
    const user = req.user;
    const username = user.username;
    const idCart = user.cartActual;

    if (idCart != 'empty') {
      const productsMap = await service.getProducts(idCart);
      if (productsMap) {
        res.render('cart', { productsMap, idCart, username });
        logger.log('info', '/api/cart/:id/products - GET');
      } else {
        logger.log('error', 'no se puedo acceder a lista de productos');
      }
    } else {
      res.render('cartEmpty');
    }
  } catch (err) {
    logger.log('error', 'no se puedo acceder a lista de productos o no existe el carrito en el user');
  }
};

const deleteCart = async (req, res) => {
  const idCart = req.user.cartActual;
  const { username } = req.user;
  const cartDeleted = await service.deleteCart(idCart, username);
  logger.log('info', '/api/cart/delcart - DELETE  eliminar carrito');
  res.redirect('/api/login');
};

const deleteProdFromCart = async (req, res) => {
  const idProduct = req.body
  const user = req.user;
  const idCart = req.user.cartActual;
  const eliminarProd = await service.deleteProdFromCart(idCart, idProduct);
  res.redirect(`/api/cart/${idCart}/products`);
  logger.log('info', '/api/cart/products - DELETE');
};

const confirmOrder = async (req, res) => {
  const { username } = req.user;
  const idCart = req.user.cartActual;

  const sendMsg = await service.confirmOrder(username, idCart);
  res.render('orderSuccessful');
  logger.log('info', '/api/cart/confirmOrder - POST');
};

module.exports = {
  createCart,
  addProductToCart,
  getProducts,
  deleteCart,
  deleteProdFromCart,
  confirmOrder,
};
