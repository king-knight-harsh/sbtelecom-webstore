/**
 * Script with logic to the user routes
 */
//Importing common code snippet from common.js
const customError = require("../utils/common");
//Importing the User and Order models from models folder
const User = require("../models/User");

/**
 * Middleware for getting the user by particular order id
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with details related to the user
 */
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			// returning bad request error with json response
			return customError.customErrorMessage(
				res,
				404,
				`User not found in the DATABASE`
			);
		}
		req.profile = user;
		next(); //jumping to the next method or middleware
	});
};

/**
 * Callback method for get a particular user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return user: Successful attempt - JSON response with details related to the user
 */
exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	return res.json(req.profile);
};

/**
 * Callback method for updating a particular user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with details related to the user
 */
exports.updateUser = (req, res) => {
	//using findByIdAndUpdate method from mongoose to find and update the user
	User.findByIdAndUpdate(
		{
			_id: req.profile._id,
		},
		{
			$set: req.body,
		},
		{
			new: true,
			useFindAndModify: false,
		},
		(err, user) => {
			if (err) {
				// returning bad request error with json response
				return customError.customErrorMessage(
					res,
					400,
					"UPDATING THE USER WAS NOT SUCCESSFUL"
				);
			}
			res.json(user); //JSON response with details related to the user
		}
	);
};

exports.removeUser = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("User has been deleted...");
	} catch (err) {
		return customError.customErrorMessage(
			res,
			400,
			"UNABLE TO DELETE THE USER FROM DATABASE"
		);
	}
};

exports.findUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		return customError.customErrorMessage(
			res,
			404,
			"USER NOT FOUND IN THE DATABASE"
		);
	}
};


exports.findAllUser = async (req, res) => {
	const query = req.query.new;
	try {
		const users = query
			? await User.find().sort({ _id: -1 }).limit(5)
			: await User.find();
		res.status(200).json(users);
	} catch (err) {
		return customError.customErrorMessage(
			res,
			404,
			"USER NOT FOUND IN THE DATABASE"
		);
	}
};

exports.getUserStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
		return customError.customErrorMessage(
			res,
			404,
			"NO USER FOUND IN THE DATABASE"
		);
	}
  }
