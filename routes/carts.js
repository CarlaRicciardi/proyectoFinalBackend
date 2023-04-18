const express = require('express');
const routerCarts = express.Router();
const controller = require('../controller/carts.js');

routerCarts.post('/cart', controller.createCart);
routerCarts.post('/cart/:idCart/products', controller.addProductToCart)
routerCarts.get("/cart/:idCart/products", controller.getProducts);
// carritoRouter.delete("/cart/delcart", deleteCartController);
// carritoRouter.delete("/cart/productos", deleteProdFromCartController);
// carritoRouter.post("/cart/confirmar-pedido", confirmOrderController);

module.exports = routerCarts;
