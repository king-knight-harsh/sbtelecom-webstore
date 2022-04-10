/**
 * Script with all routes related to authentication:
 * /api/login - route for signup new user
 * /api/register - route for signIn the user
 * /api/logout - route for signOut the user
 */

//Importing common code snippet from common.js
const customError = require("../utils/common");
//Importing the express library
var express = require("express");
//Using the routers for the router
var router = express.Router();
const User = require("../models/User");
//Importing jsonwebtoken
const jwt = require("jsonwebtoken");
//Importing express-jsonwebtoken
var expressJwt = require("express-jwt");
//Importing express-validator
const { validationResult } = require("express-validator");

/**
 * Call method for registering a new user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with name, email address and id for the user
 */
exports.register = (req, res) => {
	// Validating the request
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// returning Unprocessable Entity error
		return customError.customErrorMessage(res, 422, errors.array()[0].msg);
	}
	//Creating new User model
	const user = new User(req.body);
	/**
	 * Method to save the user in the Database
	 * @param err: Error if any error occur while saving process
	 * @param user: User object with user information
	 * @return err: Unsuccessful attempt to save user in the database
	 * @return user: Successful attempt - JSON response with name, email address and id for the user
	 */
	user.save((err, user) => {
		if (err) {
			return customError.customErrorMessage(
				res,
				400,
				"NOT able to save user in DB"
			);
		}
		res.json(user);
	});
};

/**
 * Call back method to validate the user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @returns custom JSON response with user details
 */
exports.login = (req, res) => {
	//Validating the request
	const errors = validationResult(req);
	// destructure the variable
	const { email, password } = req.body;
	// returning Unprocessable Entity error
	if (!errors.isEmpty()) {
		return customError.customErrorMessage(res, 422, errors.array()[0].msg);
	}
	// Finding particular user
	User.findOne(
		{
			email,
		},
		(err, user) => {
			//Error response if error occur or no user is found
			if (err || !user) {
				return customError.customErrorMessage(
					res,
					404,
					"User email does not exist"
				);
			}
			//Error response if the authentication of the user fails
			if (!user.authenticate(password)) {
				return customError.customErrorMessage(
					res,
					400,
					"Email and password do not match"
				);
			}
			// Creating token
			const accessToken = jwt.sign(
				{
					_id: user._id,
					isAdmin: user.isAdmin,
				},
				process.env.JWT_SEC
			); //getting the string from the .env file
			// Put token in cookie
			res.cookie("accessToken", accessToken, {
				expire: Math.floor(Date.now() / 1000) + 60 * 60, //Token expires in 1 hour
			});

			// send custom response to front end with successful response
			const { _id, username, email, isAdmin } = user;
			// returning the json response with user's _id, firstName, email and role
			return res.json({
				accessToken,
				_id,
				username,
				email,
				isAdmin,
			});
		}
	);
};

/**
 * Callback method for signing out of the website
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 */
exports.logout = (req, res) => {
	res.clearCookie("token");
	res.json({
		message: "User signOut successfully", //response for successful signOut
	});
};
