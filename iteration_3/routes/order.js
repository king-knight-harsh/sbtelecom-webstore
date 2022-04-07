/**
 * Script with all routes related to orders:
 * /api/order/create/:userId - route for creating a new order
 * /api/order/all/:userId - route for getting all the orders
 * /api/order/status/:userId - route for getting the status of the order
 * /api/order/:orderId/userId - route for updating the status of the order
 */

//Importing the express library
const express = require("express");
//Using the routers for the router
const router = express.Router();
// Using the middleware isSignedIn, isAuthenticated, isAdmin from auth controllers
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth");
//Using the middleware getUserById and pushOrderInPurchaseList from the user controllers
const {
  getUserById,
  pushOrderInPurchaseList
} = require("../controllers/user");
// using the middleware updateStock from product controllers
const {
  updateStock
} = require("../controllers/product");
// Using getCategoryById,createCategory,getCategory,getAllCategory,updateCategory, removeCategory 
// routes and middleware from category controllers
const {
  getOrderById,
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderStatus,
} = require("../controllers/order");

//Using param to run the middleware getUserById and getOrderById with particular keywords
router.param("userId", getUserById);
router.param("orderId", getOrderById);

/**
 * Post route for creating an order with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not
 * Middleware pushOrderInPurchaseList to push the product in the user cart
 * Middleware updateStock to update the count in the database
 * Method createOrder to create a new order
*/
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

/**
 * Get route for getting the order with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not 
 * Method getAllOrders to get all orders
 */
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

/**
 * Get route for getting the status of the order with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not 
 * Method  getOrderStatus to get the status of the order
 */
router.get(
  "/order/status/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
/**
 * Put route for updating the existing order with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not 
 * Method updateStatus to update status of the order
 */
router.put(
  "/order/:orderId/userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);
//exporting the router
module.exports = router;