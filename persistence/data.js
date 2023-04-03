const DaoMongoDB = require("./daos/DaoMongoDB.js");
const ProductsDaoMongoDB = DaoMongoDB[0]
const CartDaoMongoDB = DaoMongoDB[1];
const DaoMemoria = require("./daos/DaoMemoria.js");
const ProductsDaoMemoria = DaoMemoria[0];
const CartDaoMemoria = DaoMemoria[1];


let DAOProducts;
let DAOCart;
let modo = process.argv[2];

if (modo == "prod"){
  DAOProducts = ProductsDaoMongoDB;
  DAOCart = CartDaoMongoDB;
} else if (modo == "dev"){
  DAOProducts = ProductsDaoMemoria;
  DAOCart = CartDaoMemoria;
} else {
  throw 'Indicar que modo utilizar para fabricar DAO'
}

module.exports = [ DAOProducts, DAOCart ];