const config = require('../config/config.js');
const PERSISTENCE = config.PERSISTENCE;
const factoryDaoProducts = require('../persistence/daos/products/factoryDaoProducts.js');
const DaoProducts = new factoryDaoProducts(PERSISTENCE);

async function getAll() {
  try {
    const allProducts = await DaoProducts.getAll();
    return allProducts;
  } catch (err) {
    logger.log('error', 'error getAllProducts');
  }
}

async function getById(id) {
  let result = await DaoProducts.getById(id);
  if (!result) {
    return 'No se encontró ningún producto';
  }
  return result;
}

async function saveNew(objProd) {
  const saveProdInDB = await DaoProducts.saveNew(objProd);
}

const replace = async (obj) => {
  const updateProd = await DaoProducts.replace(obj);
  return updateProd;
};

const deleteProdFromDB = async (idp) => {
  const productDeleted = await DaoProducts.deleteById(id);
  return productDeleted;
};

module.exports = {
  getAll,
  getById,
  saveNew,
  replace,
  deleteProdFromDB,
};
