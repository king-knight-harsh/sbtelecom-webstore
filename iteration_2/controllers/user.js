/**
 * Script with logic to the user routes
 */

//Importing the User and Order models from models folder
const User = require("../models/user");
const Order = require("../models/order");

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
      return res.status(400).json({
        error: "User not found in the DATABASE",
      });
    }
    req.profile = user;
    next();//jumping to the next method or middleware
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
      _id: req.profile._id
    }, {
      $set: req.body
    }, {
      new: true,
      useFindAndModify: false
    },
    (err, user) => {
      if (err) {
        // returning bad request error with json response
        return res.status(400).json({
          error: "UPDATING THE USER WAS NOT SUCCESSFUL",
        });
      }
      res.json(user);//JSON response with details related to the user
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
      user: req.profile._id
    })
    .populate("user", "_id firstName email")
    .exec((err, order) => {
      // returning bad request error with json response
      return res.status(400).json({
        error: "No order in this account",
      });
    });
  return res.json(order);
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
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });
  //Store in the Database
  User.findOneAndUpdate({
      _id: req.profile._id
    }, {
      $push: {
        purchases: purchases
      }
    }, {
      new: true
    },
    (err, purchases) => {
      if (err) {
        // returning bad request error with json response
        return res.status(400).json({
          error: "Unable to save the purchase list",
        });
      }
    }
  );

  next();
};