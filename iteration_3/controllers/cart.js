const Cart = require("../models/Cart");
//Importing common code snippet from common.js
const customError = require("../utils/common");

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
exports.getAllCarts = async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json(carts);
	} catch (err){
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO GET ANY CARTS`
		);
	}
};
