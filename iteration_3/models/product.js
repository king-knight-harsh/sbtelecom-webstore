/**
 * Script to create the schema for product of the products
 */

// Importing the mongoose package to create schema
const mongoose = require("mongoose");
/**
 * Creating the productSchema with parameter as follows:
 * userId - Number of the user from the db 
 * desc: String description about the product
 * img: String link to the photo of the product
 * category: Array of categories
 * size: Array of the size of the product
 * color: Array of the color of the product
 * price: Number price of the product
 * inStock: Boolean to mark the product in stock or not
 */
const ProductSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, unique: true },
		desc: { type: String, required: true },
		img: { type: String, required: true },
		categories: { type: Array },
		size: { type: Array },
		color: { type: Array },
		price: { type: Number, required: true },
		inStock: { type: Boolean, default: true },
	},
	{ timestamps: true }
);
//Exporting the category schema as "Product"
module.exports = mongoose.model("Product", ProductSchema);
