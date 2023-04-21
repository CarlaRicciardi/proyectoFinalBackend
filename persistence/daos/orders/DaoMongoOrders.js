const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const OrdersSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  numOrden: { type: Number, required: true },
  date: { type: String, required: true },
  state: { type: String, required: true },
  emailUser: { type: String, required: true, max: 100 },
});
const Orders = mongoose.model('orders', OrdersSchema);

class DaoOrdersMongo {
  constructor(model) {
    this.model = model;
  }

  async getByUsername(username) {
    const user = await this.model.findOne({ emailUser: username });
    return user;
  }

  async saveNew(obj) {
    console.log('obj en daomongo orders', obj)
    const newOrder = await this.model.create(obj);
console.log('new order en daomongoorders', newOrder)
    return newOrder;
  }

  async getOrderNumber() {
    const ordersLength = await this.model.find({}).count();
    const orderNumber = ordersLength + 1;
    return orderNumber;
  }
}

module.exports = {
  DaoOrdersMongo,
  Orders,
};
