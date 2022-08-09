/** @format */

const mongoose = require("mongoose");

const variantsSchema = new mongoose.Schema({
  sku: String,
  specification: String,
  price: {
    type: Number,
    require: true,
  },
});

const ProductSchema = mongoose.Schema({
  reference: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: String,
  image: String,
  variants: [variantsSchema],
});

const Product =
  mongoose.models.Product || mongoose.model("Products", ProductSchema);

module.exports = Product;
