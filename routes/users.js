const express = require('express');
const routerUsers = express.Router();
const passport = require('passport');
const controller = require('../controller/users.js');

routerUsers.get('/', controller.getIndex);
routerUsers.get('/login', controller.getLogin);
routerUsers.post('/login', passport.authenticate('login', { failureRedirect: '/api/failLogin' }), controller.postLogin);
routerUsers.get('/failLogin', controller.getFailLogin);
routerUsers.get('/logout', controller.getLogout);
routerUsers.get('/signup', controller.getSignup);
routerUsers.post('/signup', passport.authenticate('signup', { failureRedirect: '/api/failSignup' }), controller.postSignup);
routerUsers.get('/failSignup', controller.getFailSignup);

module.exports = routerUsers;
