const logger = require('../../../config/logger.js');
const { DaoMongoCart, CartsModel } = require('./DaoMongoCarts.js');
const DaoMemoryCart = require('./DaoMemoryCarts.js');

class FactoryDaoCarts {
  constructor(PERSISTENCE) {
    if (FactoryDaoCarts._instance) {
      logger.log('error', "Singleton classes can't be instantiated more than once.");
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    FactoryDaoCarts._instance = this;

    this.PERSISTENCE = PERSISTENCE;
    switch (this.PERSISTENCE) {
      case 'MEM':
        return new DaoMemoryCart();
      case 'MONGO':
        return new DaoMongoCart(CartsModel);
      default:
        return new DaoMongoCart(CartsModel);
    }
  }
}

module.exports = FactoryDaoCarts;
