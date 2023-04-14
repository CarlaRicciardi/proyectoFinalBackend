const express = require('express');
const routerProducts = express.Router();
const controller = require('../controller/products.js');

routerProducts.get('/products', controller.getAll);
routerProducts.get('/products/id/:id', controller.getProductById);
//ESTOS LOS DEBERIA HACER UN ADMIN
routerProducts.post('/products', controller.postProduct);
routerProducts.put('/products/:id', controller.putProductById);
routerProducts.delete('/products/:id', controller.deleteProductById);

module.exports = routerProducts;
