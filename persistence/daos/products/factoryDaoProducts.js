const logger = require('../../../config/logger.js');
const { DaoProductsMongo, ProductsModel } = require('./DaoMongoProducts.js');
const DaoMemoryProducts = require('./DaoMemoryProducts.js');

class FactoryDaoProducts {
  constructor(PERSISTENCE) {
    if (FactoryDaoProducts._instance) {
      logger.log('error', "Singleton classes can't be instantiated more than once.");
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    FactoryDaoProducts._instance = this;

    this.PERSISTENCE = PERSISTENCE;
    switch (this.PERSISTENCE) {
      case 'MEM':
        return new DaoMemoryProducts();
      case 'MONGO':
        return new DaoProductsMongo(ProductsModel);
      default:
        return new DaoProductsMongo(ProductsModel);
    }
  }
}

module.exports = FactoryDaoProducts;
