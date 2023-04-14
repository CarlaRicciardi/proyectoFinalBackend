const { mongoose } = require('mongoose');
const config = require('../config/config.js');
const logger = require('../config/logger.js');

class connectMongoDB {
  constructor() {
    if (connectMongoDB._instance) {
      logger.log('error', "Singleton classes can't be instantiated more than once.");
    }
    connectMongoDB._instance = this;

    this.urlDB = config.MONGO_URL;
  }

  connectDBMongo() {
    mongoose
      .connect(this.urlDB)
      .then(() => logger.log('info', 'Connected to DB✅'))
      .catch((e) => {
        console.error(e);
        throw 'cannot connect to DB';
      });
  }
}

module.exports = connectMongoDB;
