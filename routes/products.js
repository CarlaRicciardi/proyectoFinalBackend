const express = require("express");
const routerProducts = express.Router();
const controller = require("../controller/products.js");

routerProducts.get("/products", controller.getProducts);
routerProducts.get("/products/:name", controller.getProductByName);
routerProducts.get("/products/id/:id", controller.getProductById);
routerProducts.post("/products", controller.postProduct);
routerProducts.put("/products/:id", controller.putProductById);
routerProducts.delete("/products/:id", controller.deleteProductById);

module.exports = routerProducts;
