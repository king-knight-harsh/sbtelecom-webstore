/**
 * Script to create the schema for order and productCart of the products
 */

// Importing the mongoose package to create schema  
const mongoose = require("mongoose");
/**
 * Creating the orderSchema with parameter as follows
 * userId - Number of the user from the db 
 * products - Array of products
 * address - String address of the user
 * status - String current status of the order out of enum array
 */
const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);
// Exporting the order schema
module.exports = mongoose.model("Order", OrderSchema);
