/**
 * Script with all routes related to authentication:
 * /api/cart/ - Post route for creating a new cart
 * /api/cart/:id - Put route for updating a existing cart
 * /api/cart/:id - Delete route for deleting a new cart
 * /api/cart/find/:userId - Get route for find the cart for particular user
 * /api/cart/ - Get route for creating a new cart
 */

const Cart = require("../models/Cart");
//Importing common code snippet from common.js
const customError = require("../utils/common");

/**
 * Callback method for creating a new cart
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 */
exports.createCart = async (req, res) => {
	const newCart = new Cart(req.body);

	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO CREATE A NEW CART`
		);
	}
};

/**
 * Callback method for updating a cart
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to update the user in the database message
 */
exports.updateCart = async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO UPDATE THE CART`
		);
	}
};

/**
 * Callback method for deleting a cart
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to remove the cart from the database
 */
exports.removeCart = async (req, res) => {
	try {
		await Cart.findByIdAndDelete(req.params.id);
		res.status(200).json("Cart has been deleted...");
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO REMOVE THE CART`
		);
	}
};

/**
 * Callback method for get user's cart
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to get the cart from the database
 */
exports.getUserCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO GET THE CART FOR THE USER`
		);
	}
};

/**
 * Callback method for all carts from the database
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to get any carts from the database
 */
exports.getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json(carts);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(res, 400, `UNABLE TO GET ANY CARTS`);
	}
};
