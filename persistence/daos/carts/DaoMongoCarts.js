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
  constructor(modelCart) {
    this.modelCart = modelCart;
  }

  async saveNew() {
    const newCart = new this.modelCart({
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

  async getProductList(idCart) {
    const cart = await this.modelCart.findOne({ _id: idCart });
    if (cart) {
      const productsCart = cart.productsCart;
      const productsMap = productsCart.map((item) => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail,
        quantity: item.quantity,
      }));
      return productsMap;
    } else {
      return false;
    }
  }

  async getById(_id) {
    const element = await this.modelCart.findOne({ _id: _id });
    return element;
  }

  async AddProdToCart(objProd, id) {
    const cartUpdated = await this.modelCart.findOneAndUpdate({ _id: id }, { $push: { productsCart: objProd } }, { new: true });
    return cartUpdated;
  }

  async deleteById(idCart) {
    let cartDeleted = await this.modelCart.deleteOne({ _id: idCart });
  }

  async getProdInCart(idCart, idProd) {
    const cart = await this.modelCart.findOne({ _id: idCart });
    const arrayProds = cart.productsCart;
    const findProd = arrayProds.find((el) => el._id == idProd);
    return findProd;
  }

  async addRepeatedProd(idProd, cantAntes, cantSum, idCart) {
    const newCant = cantAntes + cantSum;
    const cart = await this.modelCart.findOne({ _id: idCart });
    const arrayProds = cart.productsCart;
    arrayProds.find((el) => el._id == idProd).quantity = newCant;
    const cantUpdated = await this.modelCart.findOneAndUpdate({ _id: idCart }, { $set: { productsCart: arrayProds } }, { new: true });
  }

  async deleteProd(idCart, idProduct) {
    const cart = await this.modelCart.findOne({ _id: idCart });
    console.log('cart:', cart);
    const arrayProds = cart.productsCart;
    console.log('arrayprods:', arrayProds);
    try {
      arrayProds.forEach((ob) => {
        console.log('ob._id', ob._id)
        console.log('idProduct:', idProduct)
      });        
      const newArray = arrayProds.filter((el) => el._id != idProduct.product);
      console.log('newArray:', newArray);
      const cartUpdated = await this.modelCart.findOneAndUpdate({ _id: idCart }, { $set: { productsCart: newArray } }, { new: true });
      console.log('cartUpdated', cartUpdated);
    } catch (err) {
      logger.log('error', 'no se pudo eliminar producto del carrito ');
    }
  }
}

module.exports = { DaoMongoCart, CartsModel };
