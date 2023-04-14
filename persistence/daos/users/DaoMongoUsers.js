const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  address: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 100 },
  phone: { type: String, required: true, max: 100 },
  url: { type: String, required: true, max: 100 },
  cartActual: { type: String, required: true },
});
const modelUser = mongoose.model('users', UserSchema);

class DaoUsersMongo {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getByUsername(username) {
    const user = await this.model.findOne({ username: username });
    return user;
  }

  async saveNew(obj) {
    const newUser = await this.model.create(obj);
    return newUser;
  }

  async getUserById(id) {
    const user = await this.model.findById(id);
    return user;
  }
  async addCartIdToUser(username, idCart) {
    const user = await this.model.findByIdAndUpdate({ username: username }, { $set: { cartActual: idCart } });
    return user;
  }

  async updateSetEmptyCart(username) {
    const emptyCart = await this.model.findByIdAndUpdate({ username: username }, { $set: { cartActual: 'empty' } });
  }
}

module.exports = { DaoUsersMongo, modelUser };
