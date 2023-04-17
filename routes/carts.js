const express = require('express');
const routerCarts = express.Router();
const controller = require('../controller/carts.js');

routerCarts.post('/createCart', controller.createCart);
routerCarts.post('/cart/:id', controller.addProductToCart)
routerCarts.get("/cart/:id/products", controller.getProducts);
// carritoRouter.delete("/cart/delcart", deleteCartController);
// carritoRouter.delete("/cart/productos", deleteProdFromCartController);
// carritoRouter.post("/cart/confirmar-pedido", confirmOrderController);

module.exports = routerCarts;
