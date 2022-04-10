/**
 * Script with all routes related to users:
 * /api/orders/ - route for getting a all the orders
 * /api/products/find/:id - route for getting a particular order
 * /api/products/:id - route for updating the order
 * /api/products/:id - route for deleting the order
 * /api/products/ - route for creating a order
 * /api/products/income - route for getting the income
 */

// Importing required controllers
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrder,
  getMonthlyIncome,
} = require("../controllers/order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");
//Importing the express library
const router = require("express").Router();

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder);

//GET ALL
router.get("/", verifyTokenAndAdmin, getAllOrder);

// GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

//Exporting the router
module.exports = router;
