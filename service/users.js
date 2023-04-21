const logger = require('../config/logger.js');
const config = require('../config/config.js');
const PERSISTENCEUSERS = config.PERSISTENCEUSERS;
const factoryDaoUsers = require('../persistence/daos/users/factoryDaoUsers.js');
const DaoUsers = new factoryDaoUsers(PERSISTENCEUSERS);


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
    address: user.address,
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

const postLogin = async (username, password) => {
  const user = await getUser(username);
  if (user) {
    return user;
  } else {
    logger.log('error en postLogin');
  }
};

const postSignup = async (user) => {
  const emailRegister = await sendNewRegisterToAdmin(user);
};

const saveCartIdInUser = async (username, idCart) => {
  const user = await DaoUsers.addCartIdToUser(username, idCart);
};

const updateEmptyCartInUser = async (username) => {
  const deleteCart = await DaoUsers.updateSetEmptyCart(username);
};

module.exports = {
  createUser,
  saveCartIdInUser,
  updateEmptyCartInUser,
  getUser,
  getUserById,
  postLogin,
  postSignup,
};
