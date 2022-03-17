var express = require("express");
var router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
} = require("../controllers/product");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth");
const {
  getUserById
} = require("../controllers/user");

router.param("userId", getUserById);
router.param("productId", getProductById);

// create route
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
//read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete routes
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//update routes
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

router.get("/products", getAllProducts);
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;