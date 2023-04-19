const express = require('express');
const routerProducts = express.Router();
const controller = require('../controller/products.js');

routerProducts.get('/products', controller.getAll);
routerProducts.get('/products/:id', controller.getProductById);
routerProducts.post('/products', controller.postProduct);
routerProducts.put('/products/:id', controller.putProductById);
routerProducts.delete('/products/:id', controller.deleteProductById);
routerProducts.get("/keepShopping", controller.keepShopping);


module.exports = routerProducts;
