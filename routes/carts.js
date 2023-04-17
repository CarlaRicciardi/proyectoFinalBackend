const express = require('express');
const routerCarts = express.Router();
const controller = require('../controller/carts.js');

routerCarts.post('/cart', controller.createCart);
routerCarts.post('/:id/products', controller.addProductToCart)
// carritoRouter.get("/:id/productos", getProductsController);
// carritoRouter.delete("/delcart", deleteCartController);
// carritoRouter.delete("/productos", deleteProdFromCartController);
// carritoRouter.post("/confirmar-pedido", confirmOrderController);

module.exports = routerCarts;
