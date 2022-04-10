/**
 * Script to create the schema for product of the products
 */

// Importing the mongoose package to create schema
const mongoose = require("mongoose");
/**
 * Creating the CartSchema with parameter as follows:
 * title: String name of the product
 * desc: String description about the product
 * img: String link to the photo of the product
 * category: Array of categories
 * size: Array of the size of the product
 * color: Array of the color of the product
 * price: Number price of the product
 * inStock: Boolean to mark the product in stock or not
 */
const CartSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
