/**
 * Script with all routes related to authentication:
 * /api/product/create/:userId - route for creating a new product
 * /api/product/:productId - route for getting the product
 * /api/product/photo/:productId - route for getting the photo of the product
 * /api/product/:productId/:userId - route for deleting the product
 * /api/product/:productId/:userId - route for updating the product
 * /api/products - route for getting all the product
 * /products/categories - route for getting all the categories 
 */

//Importing the express library
var express = require("express");
//Using the routers for the router
var router = express.Router();
//Using the getProductById,createProduct,getProduct,photo,removeProduct,updateProduct,getAllProducts,getAllUniqueCategories
//from teh product controller
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
// Using the middleware isSignedIn, isAuthenticated, isAdmin from auth controllers
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth");
//Using the middleware getUserById from the user controllers
const {
  getUserById
} = require("../controllers/user");
//Using param to run the middleware getUserById and getProductById with particular keywords
router.param("userId", getUserById);
router.param("productId", getProductById);

/**
 * Post route for creating a product with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not
 * Method createProduct to create a new product
*/
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);
/**
 * Get route for getting the product from the db
 * Method getProduct to get the product
 */
router.get("/product/:productId", getProduct);
/**
 * Get route for getting the photo of the product from the db
 * Method getProduct to get the product
 */
router.get("/product/photo/:productId", photo);

/**
 * Delete route for deleting a product with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not
 * Method removeProduct to delete a product from the database
*/
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

/**
 * Update route for updating a product with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not
 * Method updateProduct to update a product in the database
*/
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);
/**
 * Get route for getting all the product from the db
 * Method getAllProducts to get all the product
 */
router.get("/products", getAllProducts);
/**
 * Get route for getting all the unique categories from the db
 * Method getAllUniqueCategories to get the unique categories from the db
 */
router.get("/products/categories", getAllUniqueCategories);
//exporting the router
module.exports = router;