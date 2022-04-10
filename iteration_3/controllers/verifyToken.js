//Importing the required libraries
const jwt = require("jsonwebtoken");
//Importing common code snippet from common.js
const customError = require("../utils/common");

/**
 * Middleware to verify the token for the user using jwt
 */
const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(" ")[1];
		jwt.verify(token, process.env.JWT_SEC, (err, user) => {
			if (err) res.status(403).json("Token is not valid!");
			req.user = user;
			next();
		});
	} else {
		return customError.customErrorMessage(
			res,
			401,
			"You are not authenticated!"
		);
	}
};
/**
 * Middleware to check if user is properly authenticated
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @returns error - Error json response about the unsuccessful attempt
 */
const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			return customError.customErrorMessage(
				res,
				403,
				"You are not allowed to do that!"
			);
		}
	});
};
/**
 * Middleware to check if user is admin (role = 1)
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @returns error - Error json response if not a admin
 */
const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			return customError.customErrorMessage(
				res,
				403,
				"You are not an admin user, act would be notified"
			);
		}
	});
};

module.exports = {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
};
