/**
 * Script with all routes related to users:
 * /api/carts/ - route for getting a all the carts
 * /api/carts/find/:userId - route for getting a particular cart
 * /api/carts/:id - route for updating the cart
 * /api/carts/:id - route for deleting the carts
 * /api/carts/ - route for creating a cart
 */

//Importing the express library
const router = require("express").Router();
const {
	createCart,
	updateCart,
	removeCart,
	getUserCart,
	getAllCarts,
} = require("../controllers/cart");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

//CREATE
router.post("/", verifyToken, createCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, removeCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

//GET ALL
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
