const service = require('../service/users.js');
const logger = require('../config/logger.js');

const getIndex = (req, res) => {
  logger.info('getIndex');
  res.redirect('/api/login');
};

const getLogin = (req, res) => {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render('profileUser', { user });
  } else {
    res.render('login');
  }
};

const getFailLogin = (req, res) => {
  logger.info('getFailLogin');
  res.render('failLogin');
};

const postLogin = async (req, res) => {
  logger.log('info', '/login - POST - render profileUser');
  const { username, password } = req.user;
  const user = await service.postLogin(username, password);
  if (user) {
    res.render('profileUser', { user });
  }
};

const getSignup = (req, res) => {
  logger.log('info', '/signup - GET');
  if (req.isAuthenticated()) {
    const { username, password, name, address, age, phone, url } = req.user;
    const user = { username, password, name, address, age, phone, url };
    res.render('profileUser', { user });
  } else {
    res.render('signup');
  }
};

const getFailSignup = (req, res) => {
  logger.info('getFailSignUp');
  res.render('failSignup');
};

const postSignup = async (req, res) => {
  logger.log('info', '/signup - POST');
  const { username, password, name, address, age, phone, url } = req.user;
  const user = { username, password, name, address, age, phone, url };
  // await service.postSignup(user) //envio mail nodemailer
  res.render('profileUser', { user });
};

const getLogout = (req, res) => {
  logger.info('getLogout');
  const { username, password } = req.user;
  const user = { username, password };
  req.session.destroy((err) => {
    if (err) {
      res.send('No se pudo deslogear');
    } else {
      res.render('logout', { user });
    }
  });
};

const failRoute = (req, res) => {
  logger.warn('failRoute');
  res.render('failRoute', {});

  res.status(404);
};

module.exports = { getIndex, getLogin, getFailLogin, getLogout, postLogin, getSignup, postSignup, getFailSignup, failRoute };
