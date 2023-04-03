const express = require("express");
const routerProduct = require("../routes/products.js");
const routerUsers = require("../routes/users.js");

const router = express.Router();

router.use(routerProduct);
router.use(routerUsers);

module.exports = router;
