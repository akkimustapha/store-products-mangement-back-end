const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");
const Product = require("../models/Product");
const User = require("../models/User");
const getProducts = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }
  if (user.email !== req.userData.email) {
    const error = new HttpError("Could not find user for provided email", 404);
    return next(error);
  }
  let products;
  try {
    products = await Product.find();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a product.",
      500
    );
    return next(error);
  }
  if (!products) {
    const error = new HttpError("Could not find a product", 404);
    return next(error);
  }
  return res.json({
    products: products.map((product) => product.toObject({ getters: true })),
  });
};
const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }
  const { name, description, type, retail_price, wholesale_price, date } =
    req.body;
  const createdProduct = new Product({
    name,
    description,
    type,
    retail_price,
    wholesale_price,
    date,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  if (user.email !== req.userData.email) {
    const error = new HttpError("Could not find user for provided email", 404);
    return next(error);
  }

  try {
    await createdProduct.save();
  } catch (err) {
    const error = new HttpError(
      "Creating product failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ product: createdProduct.toObject({ getters: true }) });
};

const updateProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed please check your data",
      422
    );
    return next(error);
  }
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  if (user.email !== req.userData.email) {
    const error = new HttpError("Could not find user for provided email", 404);
    return next(error);
  }
  const productId = req.params.pid;
  const { name, description, type, retail_price, wholesale_price, date } =
    req.body;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }
  product.name = name;
  product.description = description;
  product.type = type;
  product.date = date;
  product.wholesale_price = wholesale_price;
  product.retail_price = retail_price;
  try {
    await product.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update producte.",
      500
    );
    return next(error);
  }

  res.status(200).json({ product: product.toObject({ getters: true }) });
};
const deleteProduct = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  if (user.email !== req.userData.email) {
    const error = new HttpError("Could not find user for provided email", 404);
    return next(error);
  }
  const productId = req.params.pid;
  let product;
  try {
    product = await Product.findById(productId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product.",
      500
    );
    return next(error);
  }
  if (!product) {
    const error = new HttpError("Could not find product for this id.", 404);
    return next(error);
  }
  try {
    await product.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete product.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "deleted product" });
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
