const MongoStore = require('connect-mongo');
const session = require('express-session');
const config = require('../config/config.js');

const configMongoSession = session({
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    ttl: 60000 * 10,
    cookie: { maxAge: 60000 * 10 },
  }),
  secret: 'secreto',
  resave: true,
  saveUninitialized: false,
});

module.exports = { configMongoSession };
