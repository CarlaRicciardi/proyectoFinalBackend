const service = require('../service/users.js');
const logger = require('../config/logger.js');

const getIndex = (req, res) => {
  logger.info('getIndex');
  res.redirect('/login');
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render('allProducts', { user });
  } else {
    res.render('login');
  }
};

const getFailLogin = (req, res) => {
  logger.info('getFailLogin');
  res.render('failLogin');
};

const postLogin = (req, res) => {
  logger.info('postLogin');
  const { username, password, name, address, age, phone, url } = req.user;
  const user = { username, password, name, address, age, phone, url };
  req.session.user = user;
  res.redirect('/api/products');
};

const getSignup = (req, res) => {
  logger.info('getSignUp');
  if (req.isAuthenticated()) {
    const { username, password, name, address, age, phone, url } = req.user;
    const user = { username, password, name, address, age, phone, url };
    req.session.user = user;
    res.redirect('/api/products');
  } else {
    res.render('signup');
  }
};

const getFailSignup = (req, res) => {
  logger.info('getFailSignUp');
  res.render('failSignup');
};

const postSignup = (req, res) => {
  logger.info('postSignup');
  const { username, password, name, address, age, phone, url } = req.user;
  const user = { username, password, name, address, age, phone, url };
  res.render('successSignup', { user });
};

const getLogout = (req, res) => {
  logger.info('getLogout');
  const { username, password } = req.user;
  const user = { username, password };
  req.session.destroy((err) => {
    if (err) {
      res.send('No se pudo deslogear');
    } else {
      res.render('logout', {user});
    }
  });
};

const failRoute = (req, res) => {
  logger.warn('failRoute');
  res.render('failRoute', {});

  res.status(404);
};

module.exports = { getIndex, getLogin, getFailLogin, getLogout, postLogin, getSignup, postSignup, getFailSignup, failRoute };
