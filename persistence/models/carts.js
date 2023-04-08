const { Schema, model } = require('mongoose');

const CartsSchema = new Schema({
  username: { type: String, required: true, max: 100 },
  productos: [{ type: Object }],
});

const ModelCarts = model('carts', CartsSchema);
module.exports = { ModelCarts };
