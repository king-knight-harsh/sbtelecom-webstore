/**
 * Script with all routes related to users:
 * /api/user/:userId - route for getting the user
 * /api/user/:userId - route for updating the user
 * /api/orders/user/:userId - route for getting the order list for the user
 */

//Importing the express library
const express = require("express");
const router = express.Router();

const User = require("../models/User");
// Using the middleware isSignedIn, isAuthenticated, isAdmin from auth controllers
//Using getUserById,getUser,updateUser,userPurchaseList from user controllers
const {
    getUserById,
    getUser,
    updateUser,
    removeUser,
    findUser,
    findAllUser,
    getUserStats
  } = require("../controllers/user");
  const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("../controllers/verifyToken");



//Using param to run the middleware getUserById with particular keyword
router.param("userId", getUserById);
router.param("adminUserId",getUserById);

/**
 * Get route for getting details related to a particular order
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Method getUser to get the user with particular UserID
*/
router.get("/:userId", verifyTokenAndAuthorization, getUser);
/**
 * Put route for updating details related to a particular order
 * Middleware isSignIn to check if the user is signIn or not
 * Middleware isAuthenticated to check if the user is properly authenticated or not
 * Method updateUser to updating the user with particular UserID
*/
router.put("/:userId",  verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, removeUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin,findUser );

//GET ALL USER
router.get("/", verifyTokenAndAdmin,findAllUser);


//GET USER STATS

router.get("/search/stats", verifyTokenAndAdmin,getUserStats);

module.exports = router;