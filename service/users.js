const logger = require('../config/logger.js');
const config = require('../config/config.js');
const PERSISTENCEUSERS = config.PERSISTENCEUSERS;
const factoryDaoUsers = require('../persistence/daos/users/factoryDaoUsers.js');
const DaoUsers = new factoryDaoUsers(PERSISTENCEUSERS);

// const { sendNewRegisterToAdmin } = require('../external-services/nodemailer');

const createUser = async (obj) => {
  const newUser = await DaoUsers.saveNew(obj);
  return newUser;
};

const getUser = async (username) => {
  const user = await DaoUsers.getByUsername(username);
  const usuario = {
    username: user.username,
    password: user.password,
    name: user.name,
    adress: user.adress,
    age: user.age,
    phone: user.phone,
    url: user.url,
    cartActual: user.cartActual,
  };
  return usuario;
};

const getUserById = async (id) => {
  const user = await DaoUsers.getById(id);
  return user;
};

// const postLogin = async (username, password, password2) => {
//   const user = await findUser(username);
//   if (password === password2) {
//     return user;
//   } else {
//     logger.log('error', 'password no coincide');
//     return false;
//   }
// };

// const postSignup = async (user) => {
//   const emailRegister = await sendNewRegisterToAdmin(user);
// };

const saveCartIdInUser = async (username, idCart) => {
  const user = await DaoUsers.addCartIdToUser(username, idCart);
};

const updateEmptyCartInUser = async (username) => {
  const deleteCart = await DaoUsers.updateSetEmptyCart(username);
};

module.exports = {
  createUser,
  // postLogin,
  // postSignup,
  saveCartIdInUser,
  updateEmptyCartInUser,
  getUser,
  getUserById,
};
