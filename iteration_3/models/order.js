/**
 * Script to create the schema for order and productCart of the products
 */

// Importing the mongoose package to create schema  
const mongoose = require("mongoose");
const {
  ObjectId
} = mongoose.Schema;

/**
 * Creating the productCartSchema with parameter as follows
 * product - Object of type Product 
 * name - String name of the product
 * count - Integer number as the count of the product
 * price - Float number as the price of the product 
 */
const ProductCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",//referencing to the other schema
  },
  name: String,//string for name field
  count: Number,//number for count field
  price: Number,//number for price field
});
//Storing the productCartSchema in ProductCart variable
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);


/**
 * Creating the orderSchema with parameter as follows
 * products - Array of productCartSchema
 * amount - Number total value of the order
 * status - String current status of the order out of enum array
 * updated - Date for the order
 * user - User who placed the order 
 */
const OrderSchema = new mongoose.Schema({
  products: [ProductCartSchema],//array of productCartSchema
  transaction_id: {},
  amount: {
    type: Number,//number for the amount param
  },
  address: String,//string address for shipping the order
  status: {
    type: String,//string status of the order
    default: "",//default status as empty
    enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],//current order status
  },
  updated: Date,//date of order placement
  user: {
    type: ObjectId,//User object
    ref: "User",//referring to the User schema
  },
}, {
  timestamps: true,//To create the time stamp for createAT and UpdateAT to be stored in the database
});
//Storing the OrderSchema in Order variable
const Order = mongoose.model("Order", OrderSchema);
// Exporting the order and productCart schema
module.exports = {
  Order,
  ProductCart,
};