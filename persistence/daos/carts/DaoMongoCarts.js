const logger = require('../../../config/logger.js');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const ProductToCart = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 10000 },
  quantity: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema(
  {
    productsCart: [ProductToCart],
  },
  { timestamps: true },
);

const CartsModel = mongoose.model('carts', CartSchema);

class DaoMongoCart {
  constructor(model) {
    this.model = model
  }

  async saveNew() {
    const newCart = new this.CartsModel({
      productsCart: [],
    });
    const cartObj = await newCart.save();
    const idCart = cartObj._id;
    return idCart;
  }

  async getAll() {
    const all = await this.model.find({});
    return all;
  }

  async getProductList(id) {
    const cart = await this.model.findOne({ _id: id });
    if (cart) {
      const productsCart = cart.productsCart;
      const productsMap = productsCart.map((item) => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
      }));
      return productsMap;
    } else {
      return false;
    }
  }

  async getById(_id) {
    const element = await this.model.findOne({ _id: _id });
    return element;
  }

  async addProductToCart(objProd, id) {
    const cartUpdated = await this.model.findOneAndUpdate({ _id: id }, { $push: { productsCart: objProd } }, { new: true });
    return cartUpdated;
  }

  async deleteById(id) {
    let cartDeleted = await this.model.deleteOne({ _id: id });
  }

  async getProdInCart(idCart, idProd) {
    const cart = await this.model.findOne({ _id: idCart });
    const arrayProds = cart.productsCart;
    const findProd = arrayProds.find((el) => el._id == idProd);
    return findProd;
  }

  async addRepeatedProd(idProd, cantAntes, cantSum, idCart) {
    const newCant = cantAntes + cantSum;
    const cart = await this.model.findOne({ _id: idCart });
    const arrayProds = cart.productsCart;
    arrayProds.find((el) => el._id == idProd).quantity = newCant;
    const cantUpdated = await this.model.findOneAndUpdate({ _id: idCart }, { $set: { productsCart: arrayProds } }, { new: true });
    // const importTotal = arrayProds.reduce((acc, element) => acc + element.price * element.quantity, 0);
  }

  async deleteProd(id, idProd) {
    const cart = await this.model.findOne({ _id: id });
    const arrayProds = cart.productsCart;
    try {
      const newArray = arrayProds.filter((el) => el._id != idProd);
      const cartUpdated = await this.model.findOneAndUpdate({ _id: id }, { $set: { productsCart: newArray } }, { new: true });
    } catch (err) {
      logger.log('error', 'no se pudo eliminar producto del carrito ');
    }
  }
}

module.exports = { DaoMongoCart, CartsModel };
