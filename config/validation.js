const Joi = require("joi");

const ProductsValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  thumbnail: Joi.string().min(3).max(100).required(),
  price: Joi.number().required(),
});

module.exports = ProductsValidation;
