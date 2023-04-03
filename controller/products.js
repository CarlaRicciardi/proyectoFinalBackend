const service = require("../service/products.js");

async function getProducts(req, res) {
  let allProducts = await service.getProducts();
  const productsFixed = allProducts.map((item) => {
    return {
      id: item._id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
    };
  });
  if (productsFixed) {
    res.render("allProducts", {
      products: productsFixed,
      // user: req.session.user,
    });
  }
}
//cuando agregue todo lo de usuarios agregar linea de abajo user


async function getProductByName(req, res) {
  let { name } = req.params;
  let result = await service.getProductByName(name);
  res.status(200).json(result);
}

async function getProductById(req, res) {
  let { id } = req.params;
  let result = await service.getProductById(id);
  res.status(200).json(result);
}

async function postProduct(req, res) {
  let result = await service.postProduct(
    req.body.title,
    req.body.thumbnail,
    req.body.price
  );
  res.status(201).json(result);
}

async function putProductById(req, res) {
  let { id } = req.params;
  let result = await service.putProductById(
    id,
    req.body.title,
    req.body.thumbnail,
    req.body.price
  );
  res.status(201).json(result);
}

async function deleteProductById(req, res) {
  let { id } = req.params;
  let result = await service.deleteProductById(id);
  res.status(202).json(result);
}

module.exports = {
  getProducts,
  getProductByName,
  getProductById,
  postProduct,
  putProductById,
  deleteProductById,
};
