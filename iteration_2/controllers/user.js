/**
 * Script with logic to the user routes
 */
//Importing common code snippet from common.js
const customError = require("../utils/common");
//Importing the User and Order models from models folder
const User = require("../models/user");
const {Order} = require("../models/order");

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
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
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
  User.findByIdAndUpdate({
      _id: req.profile._id,
    }, {
      $set: req.body,
    }, {
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
/**
 * Callback method for getting the purchase list for a particular user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with details related to the user
 */
exports.userPurchaseList = (req, res) => {
  //finding all the products in the purchase list for the product
  Order.find({
      user: req.profile._id,
    })
    .populate("user", "_id firstName email")
    .exec((err, order) => {
      // returning bad request error with json response
      if(err){
        return customError.customErrorMessage(
          res,
          400,
          "No order in this account"
        );
      }
      return res.json(order)
    });
    
  ;
};

/**
 * Middleware for pushing the product  in the purchase list for a particular user
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return err: Unsuccessful attempt to save user in the database
 * @return user: Successful attempt - JSON response with details related to the user
 */
exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.forEach((product) => {
    purchases.push(product);
  });
  //Store in the Database
  User.findOneAndUpdate({
      _id: req.profile._id,
    }, {
      $push: {
        purchases: purchases,
      },
    }, {
      new: true,
    },
    (err, purchases) => {
      if (err) {
        // returning bad request error with json response
        return customError.customErrorMessage(
          res,
          400,
          "Unable to save the purchase list"
        );
      }
    }
  );

  next();
};

/**
 * Call back method to remove a user from the database
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @returns json response with details related to User
 */
 exports.removeUser = (req, res, userId) => {
  const user = userId;
  console.log(user);
  /**
   * Method to remove the user from the Database
   * @param err: Error if any error occur while saving process
   * @param user: User object with user information
   * @return err: Unsuccessful attempt to save user in the database
   * @return user: Successful attempt - JSON response with details related to user
   */
  user.findOneAndRemove((err, user) => {
    if (err) {
      return customError.customErrorMessage(
        res,
        404,
        `Failed to delete user: ${user.name}`
      );
    }
    res.json({
      message: `Successfully deleted user: ${user.name}`,
    });
  });
};