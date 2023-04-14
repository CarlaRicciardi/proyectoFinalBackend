const logger = require('../../../config/logger.js');
const { DaoUsersMongo, modelUser } = require('./DaoMongoUsers.js');

class FactoryDaoUsers {
  constructor(PERSISTENCE) {
    if (FactoryDaoUsers._instance) {
      logger.log('error', "Singleton classes can't be instantiated more than once.");
      throw new Error("Singleton classes can't be instantiated more than once.");
    }
    FactoryDaoUsers._instance = this;

    this.PERSISTENCE = PERSISTENCE;
    switch (this.PERSISTENCE) {
      case 'MONGO':
        return new DaoUsersMongo(modelUser);
      default:
        return new DaoUsersMongo(modelUser);
    }
  }
}

module.exports = FactoryDaoUsers;
