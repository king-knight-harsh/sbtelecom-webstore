/**
 * Script with logic to the following routes:
 * signIn, signOut, signUp
 */

//Importing common code snippet from common.js
const customError = require("../utils/common");
//Importing User schema from models
const User = require("../models/user");
//Importing express-validator
const {
  check,
  validationResult
} = require("express-validator");
//Importing jsonwebtoken
var jwt = require("jsonwebtoken");
//Importing express-jsonwebtoken
var expressJwt = require("express-jwt");

/**
 * Call back module for signUp logic
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with name, email address and id for the user
 */
exports.signUp = (req, res) => {
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
    res.json({
      Name: user.firstName,
      Email: user.email,
      id: user._id,
    });
  });
};
/**
 * Call back method to validate the user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @returns custom JSON response with user details
 */
exports.signIn = (req, res) => {
  //Validating the request
  const errors = validationResult(req);
  // destructure the variable
  const {
    email,
    password
  } = req.body;
  // returning Unprocessable Entity error
  if (!errors.isEmpty()) {
    return customError.customErrorMessage(res, 422, errors.array()[0].msg);
  }
  // Finding particular user
  User.findOne({
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
      const token = jwt.sign({
          _id: user._id,
        },
        process.env.JWT_KEY
      ); //getting the string from the .env file
      // Put token in cookie
      res.cookie("token", token, {
        expire: Math.floor(Date.now() / 1000) + (60 * 60), //Token expires in 1 hour 
      });

      // send custom response to front end with successful response
      const {
        _id,
        firstName,
        email,
        role
      } = user;
      // returning the json response with user's _id, firstName, email and role
      return res.json({
        token,
        user: {
          _id,
          firstName,
          email,
          role,
        },
      });
    }
  );
};
/**
 * Callback method for signing out of the website
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 */
exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signOut successfully", //response for successful signOut
  });
};

/**
 * Middleware to check if user is signIn or not
 */
exports.isSignedIn = expressJwt({
  secret: process.env.JWT_KEY, //string for creating the token using string in .env file
  userProperty: "auth",
  algorithms: ["HS256"], //algorithm for creating the token
});

/**
 * Middleware to check if user is properly authenticated
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @returns error - Error json response about the unsuccessful attempt
 */
exports.isAuthenticated = (req, res, next) => {
  let authenticationChecker =
    req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authenticationChecker) {
    return customError.customErrorMessage(res, 403, "ACCESS DENIED");
  }
  next(); //jumping to the next method or middleware
};
/**
 * Middleware to check if user is admin (role = 1)
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @returns error - Error json response if not a admin
 */
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return customError.customErrorMessage(
      res,
      403,
      "You are not ADMIN, Access Denied"
    );
  }
  next();
};