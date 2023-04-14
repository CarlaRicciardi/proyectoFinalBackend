const express = require('express');
const routerProducts = require('../routes/products.js');
const routerUsers = require('../routes/users.js');
const routerCarts = require('../routes/carts.js');

const router = express.Router();

router.use(routerProducts);
router.use(routerUsers);
router.use(routerCarts);

module.exports = router;
