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

// const getProductsController = async (req, res) => {
//   try {
//     const user = req.user;
//     const username = user.username;
//     const id = user.carritoactual;
//     if (id != "empty") {
//       const productosMap = await getProducts(id);
//       if (productosMap) {
//         res.render("carrito", { productosMap, id, username });
//         logger.log("info", "/api/carrito/:id/productos - GET");
//       } else {
//         logger.log("error", "no se puedo acceder a lista de productos");
//       }
//     } else {
//       res.render("carrito-vacio");
//     }
//   } catch (err) {
//     logger.log(
//       "error",
//       "no se puedo acceder a lista de productos o no existe el carrito en el user"
//     );
//   }
// };

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
  // deleteCartController,
  // getProductsController,
  // deleteProdFromCartController,
  // confirmOrderController,
};
