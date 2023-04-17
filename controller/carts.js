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
  const { idCart } = req.params;
  // const idCart = id;
  await service.addProductToCart(objProd, idCart);
  res.redirect(`/api/cart/${idCart}/`);
  logger.log("info", "/api/cart/:id - POST");
};

const getProducts = async (req, res) => {
  try {
    const user = req.user;
    const username = user.username;
    const idCart = user.cartActual;
    console.log('user', user)
    console.log('user', username)
    console.log('user', idCart)

    if (idCart != "empty") {
      const productsMap = await service.getProducts(idCart);
      if (productsMap) {
        res.render("carts", { productsMap, idCart, username });
        logger.log("info", "/api/cart/:id/productos - GET");
      } else {
        logger.log("error", "no se puedo acceder a lista de productos");
      }
    } else {
      res.render("cartEmpty");
    }
  } catch (err) {
    logger.log(
      "error",
      "no se puedo acceder a lista de productos o no existe el carrito en el user"
    );
  }
};

// const deleteCartController = async (req, res) => {
//   const { id } = req.body;
//   const { username } = req.user;
//   const carritoEliminado = await deleteCart(id, username);
//   logger.log("info", "/api/carrito/delcart - DELETE  eliminar carrito");
//   res.redirect("/api/usuarios/login");
// };

// const deleteProdFromCartController = async (req, res) => {
//   const { prod } = req.body;
//   const user = req.user;
//   const id = user.carritoactual;
//   const eliminarProd = await deleteProdFromCart(id, prod);
//   res.redirect(`/api/carrito/${id}/productos`);
//   logger.log("info", "/api/carrito/productos - DELETE");
// };

// const confirmOrderController = async (req, res) => {
//   const { username } = req.body;
//   const { id } = req.body;
//   const enviarMensajes = await confirmOrder(username, id);
//   res.render("pedido-exitoso");
//   logger.log("info", "/api/carrito/confirmar-pedido - POST");
// };

module.exports = {
  createCart,
  addProductToCart,
  getProducts,
  // deleteCartController,
  // getProductsController,
  // deleteProdFromCartController,
  // confirmOrderController,
};
