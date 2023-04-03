const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  wholesale_price: {
    type: Number,
    required: true,
    trim: true,
  },
  retail_price: {
    type: Number,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
