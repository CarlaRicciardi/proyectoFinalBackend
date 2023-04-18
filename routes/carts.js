const express = require('express');
const routerCarts = express.Router();
const controller = require('../controller/carts.js');

routerCarts.post('/cart', controller.createCart);
routerCarts.post('/cart/:id/products', controller.addProductToCart)
routerCarts.get("/cart/:id/products", controller.getProducts);
routerCarts.delete("/cart/delcart", controller.deleteCart);
routerCarts.delete("/cart/products", controller.deleteProdFromCart);
routerCarts.post("/cart/confirmOrder", controller.confirmOrder);

module.exports = routerCarts;
