const service = require('../service/products.js');
const logger = require('../config/logger.js');

async function getAll(req, res) {
  const user = {idCart: req.user.cartActual}
  const idCart = req.user.cartActual
  // console.log('user:', user)
  // console.log('idCart', idCart)
  let allProducts = await service.getAll();
  const productsFixed = allProducts.map((item) => {
    return {
      id: item._id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      idCart: idCart
    };
  });
  if (productsFixed) {
    res.render('allProducts', {
      products: productsFixed,
      user: user,
      // idCart: idCart
    });
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  const product = await service.getById(id);
  const idCart = req.user.cartActual;
  if (!product) {
    res.status(404).send('producto no encontrado');
  } else {
    res.render('allProducts', { data: { idCart, product } });
    res.status(200).json(product);
  }
}

async function postProduct(req, res) {
  let result = await service.postProduct(req.body.title, req.body.thumbnail, req.body.price);
  res.status(201).json(result);
}

async function putProductById(req, res) {
  let { id } = req.params;
  let result = await service.putProductById(id, req.body.title, req.body.thumbnail, req.body.price);
  res.status(201).json(result);
}

async function deleteProductById(req, res) {
  let { id } = req.params;
  let result = await service.deleteProductById(id);
  res.status(202).json(result);
}

const keepShopping = async (req, res) => {
  const user = req.user;
  const cart = user.cartActual;
  console.log('user en keep shopping', user)
  console.log('cart keep shopping', cart)
  if (cart != "empty") {
    res.redirect("/api/products");
    logger.log(
      "info",
      "/api/products/keepShopping - GET  keepShopping"
    );
  } else {
    res.redirect("/api/cart");
  }
};


module.exports = {
  getAll,
  getProductById,
  postProduct,
  putProductById,
  deleteProductById,
  keepShopping,
};
