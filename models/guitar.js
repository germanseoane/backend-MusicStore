const mongoose = require("mongoose");
const Joi = require("joi");

const guitarSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Guitar = mongoose.model("guitar", guitarSchema);

function validateGuitar(guitar) {
  const schema = Joi.object({
    brand: Joi.string().required(),
    model: Joi.string().required(),
    price: Joi.number().required().min(1).max(5000),
    inStock: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
  });

  return schema.validate(guitar);
}

function validateStock(stock) {
  const schema = Joi.object({
    inStock: Joi.number().required().min(1).max(10),
  });
  return schema.validate(stock);
}

exports.Guitar = Guitar;
exports.validateGuitar = validateGuitar;
exports.validateStock = validateStock;
