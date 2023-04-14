const logger = require('../../../config/logger.js');
const { DaoOrdersMongo, Orders } = require('./DaoMongoOrders.js');

class FactoryDaoOrders {
  constructor(PERSISTENCE) {
    if (FactoryDaoOrders._instance) {
      logger.log('error', "Singleton classes can't be instantiated more than once.");
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    FactoryDaoOrders._instance = this;

    this.PERSISTENCE = PERSISTENCE;
    switch (this.PERSISTENCE) {
      case 'MONGO':
        return new DaoOrdersMongo(Orders);
      default:
        return new DaoOrdersMongo(Orders);
    }
  }
}

module.exports = DAOFactoryShopOrders;
