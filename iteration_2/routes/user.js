/**
 * Script with all routes related to users:
 * /api/user/:userId - route for getting the user 
 * /api/user/:userId - route for updating the user
 * /api/orders/user/:userId - route for getting the order list for the user
 */

//Importing the express library
const express = require("express");
const router = express.Router();
//Using getUserById,getUser,updateUser,userPurchaseList from user controllers
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");
// Using the middleware isSignedIn, isAuthenticated, isAdmin from auth controllers
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth");

//Using param to run the middleware getUserById with particular keyword
router.param("userId", getUserById);

/**
 * Get route for getting details related to a particular order
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Method getUser to get the user with particular UserID
*/
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
/**
 * Put route for updating details related to a particular order
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Method updateUser to updating the user with particular UserID
*/
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
/**
 * Get route for getting user purchase list of a particular order
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Method userPurchaseList to get the purchase list for a particular user
*/
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);
module.exports = router;