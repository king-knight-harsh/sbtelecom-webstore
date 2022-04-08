const Product = require("../models/Product");
//Importing common code snippet from common.js
const customError = require("../utils/common");
/**
 * Callback method for creating a new product in the database
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return product: Successful attempt - JSON response with details related to the product
 */
exports.createProduct = async (req, res) => {
	const newProduct = new Product(req.body);

	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO CREATE NEW PRODUCT`
		);
	}
};

exports.updateProduct = async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO UPDATE THE PRODUCT`
		);
	}
};

exports.deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json("Product has been deleted...");
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO DELETE THE PRODUCT`
		);
	}
};

exports.getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO GET THE PRODUCT`
		);
	}
};

exports.getAllProducts = async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;

		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO GET ANY PRODUCT`
		);
	}
};
