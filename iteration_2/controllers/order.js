/**
 * Script with logic to the order routes
 */

//Importing the order and ProductCart models from models folder
const {
  Order,
  ProductCart
} = require("../models/order");
//Importing common code snippet from common.js
const customError = require("../utils/common");
/**
 * Middleware for getting the order by particular order id
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @param {*} next - jumping to the next middleware or method
 * @return err: Unsuccessful attempt to save user in the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.getOrderById = (req, res, next) => {
  //finding the order with particular id
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        // returning bad request error with json response
        return customError.customErrorMessage(res, 404, "No order found in DB");
      }
      req.order = order;
      next(); //jumping to the next method or middleware
    });
};

/**
 * Callback method for creating a new order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  /**
   * Method to save the order in the Database
   * @param err: Error if any error occur while saving process
   * @param order: Order object with user information
   * @return err: Unsuccessful attempt to save user in the database
   * @return order: Successful attempt - JSON response with details related to the order
   */
  order.save((err, order) => {
    // returning bad request error with json response
    if (err) {
      //returning the custom error message and status code with json response
      return customError.customErrorMessage(
        res,
        400,
        "Failed to save your order in DB"
      );
    }
  });
};
/**
 * Callback method for getting all the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.getAllOrders = (req, res) => {
  //using find to get all the order
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      // returning bad request error with json response
      if (err) {
        //returning the custom error message and status code with json response
        return customError.customErrorMessage(
          res,
          400,
          "NO orders found in DB"
        );
      }
      res.json(order); //json response with details related to the order
    });
};

/**
 * Callback method for getting the status of the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

/**
 * Callback method for updating the status of the order
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to save user in the database
 * @return order: Successful attempt - JSON response with details related to the order
 */
exports.updateStatus = (req, res) => {
  Order.update({
      _id: req.body.orderId,
    }, {
      $set: {
        status: req.body.status,
      },
    },
    (err, order) => {
      if (err) {
        //returning the custom error message and status code with json response
        return customError.customErrorMessage(
          res,
          400,
          "Cannot update the order status"
        );
      }
      res.json(order); //json response with details related to the order
    }
  );
};