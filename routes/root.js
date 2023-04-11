const express = require('express');
const { Router } = express;
const rootRouter = Router();

const getRootController = require('../controller/root.js');

rootRouter.get('/', getRootController);

module.exports = rootRouter;
