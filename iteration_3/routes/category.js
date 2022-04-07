/**
 * Script with all routes related to category:
 * /api/category/create/:userId - route for creating a new category
 * /api/category/:categoryId - route for getting a particular category
 * /api/category - route for getting all the categories
 * /api/category/:categoryId/:userId - put request for updating the category
 * /api/category/:categoryId/:userId - delete request for deleting the category
 */

//Importing the express library
const express = require("express");
//Using the routers for the router
const router = express.Router();
// Using getCategoryById,createCategory,getCategory,getAllCategory,updateCategory, removeCategory 
// routes and middleware from category controllers
const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
// Using the middleware isSignedIn, isAuthenticated, isAdmin from auth controllers
const {
  isSignedIn,
  isAuthenticated,
  isAdmin
} = require("../controllers/auth");
// Using middleware getUserById to get the user id
const {
  getUserById
} = require("../controllers/user");

/**
 * Create route for creating a new category with following middleWares
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Middleware isAdmin to check if the user is admin or not
 * Middleware pushOrderInPurchaseList to push the product in the user cart
 * Middleware updateStock to update the count in the database
*/
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//Post routes to create new category if the user isSignIn, isAuthenticated and isAdmin
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read routes to getAllCategory and a particular category getCategory
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//Update routes to update an existing category if the user isSignIn, isAuthenticated and isAdmin
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//Delete routes to delete an existing category if the user isSignIn, isAuthenticated and isAdmin
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);
//exporting the router
module.exports = router;