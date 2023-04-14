const logger = require('../../../config/logger.js');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const { Schema, model } = require('mongoose');

const ProductsSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const ProductsModel = model('products', ProductsSchema);

class DaoProductsMongo {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const result = await this.model.find({});
    return result;
  }

  async getById(id) {
    try {
      const result = await this.model.find({ _id: id }, { __v: false });
      return result;
    } catch {
      return false;
    }
  }

  async saveNew(objProd) {
    const newProd = new this.model({
      title: objProd.title,
      price: objProd.price,
      thumbnail: objProd.thumbnail,
    });
    const prodSaved = await newProd.save();
    logger.log('info', 'nuevo producto guardado');
  }

  async replace(obj) {
    const updateProdDB = this.model.findOneAndUpdate(
      { _id: obj.idprod },
      {
        title: obj.newTitle,
        price: obj.newPrice,
        thumbnail: obj.newThumbnail,
      },
    );
    return updateProdDB;
  }

  async deleteById(id) {
    await this.model.deleteOne({ _id: id });
    return `Se eliminó con exito`;
  }
}

module.exports = { DaoProductsMongo, ProductsModel };
