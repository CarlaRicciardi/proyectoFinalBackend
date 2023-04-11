const logger = require('../config/logger.js');

const getRootController = (req, res) => {
  res.render('index', {});
  logger.log('info', '/ - GET');
};

module.exports = getRootController;
