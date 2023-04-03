const express = require("express");
const { check } = require("express-validator");
const productsControllers = require("../controllers/products-controller");
const checkAuth = require("../middlewares/check-auth");
const router = express.Router();
router.use(checkAuth);
router.get("/products", productsControllers.getProducts);
router.post(
  "/",
  [
    check("name").trim().escape().not().isEmpty(),
    check("description").trim().escape(),
    check("type").trim().escape().not().isEmpty(),
    check("wholesale_price").trim().escape().not().isEmpty(),
    check("retail_price").trim().escape().not().isEmpty(),
    check("date").trim().escape().not().isEmpty(),
  ],
  productsControllers.createProduct
);
router.patch(
  "/:pid",
  [
    check("name").trim().escape().not().isEmpty(),
    check("description").trim().escape(),
    check("type").trim().escape().not().isEmpty(),
    check("wholesale_price").trim().escape().not().isEmpty(),
    check("retail_price").trim().escape().not().isEmpty(),
    check("date").trim().escape().not().isEmpty(),
  ],
  productsControllers.updateProduct
);
router.delete("/:pid", productsControllers.deleteProduct);
module.exports = router;
