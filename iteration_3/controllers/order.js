/**
 * Script with logic to the order routes
 */

//Importing the order models folder
const Order = require("../models/Order");
//Importing common code snippet from common.js
const customError = require("../utils/common");

/**
 * Callback method for creating a new order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.createOrder = async (req, res) => {
	const newOrder = new Order(req.body);

	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(res, 400, `UNABLE TO CREATE A NEW `);
	}
};
/**
 * Callback method for updating the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to update order from the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.updateOrder = async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{
				new: true,
			}
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO UPDATE THE ORDER `
		);
	}
};
/**
 * Callback method for deleting the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to delete order from the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json("Order has been deleted...");
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO DELETE THE ORDER `
		);
	}
};
/**
 * Callback method for get users' order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to get the order from the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.getUserOrder = async (req, res) => {
	try {
		const orders = await Order.find({
			userId: req.params.userId,
		});
		res.status(200).json(orders);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO GET THE ORDER FOR THE USER `
		);
	}
};

exports.getAllOrder = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(res, 400, `UNABLE TO GET ANY ORDER `);
	}
};
/**
 * Callback method for getting all the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to get any order from the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.getMonthlyIncome = async (req, res) => {
	const productId = req.query.pid;
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{
				$match: {
					createdAt: {
						$gte: previousMonth,
					},
					...(productId && {
						products: {
							$elemMatch: {
								productId,
							},
						},
					}),
				},
			},
			{
				$project: {
					month: {
						$month: "$createdAt",
					},
					sales: "$amount",
				},
			},
			{
				$group: {
					_id: "$month",
					total: {
						$sum: "$sales",
					},
				},
			},
		]);
		res.status(200).json(income);
	} catch (err) {
		// returning bad request error with json response
		return customError.customErrorMessage(
			res,
			400,
			`UNABLE TO THE MONTHLY SALE FOR THE MONTH `
		);
	}
};
