/**
 * Script to create the schema for product of the products
 */

// Importing the mongoose package to create schema 
const mongoose = require("mongoose");
const {
  ObjectId
} = mongoose.Schema;
/** 
 * Creating the productSchema with parameter as follows:
 * name: String name of the product
 * description: String description about the product
 * price: Number price of the product
 * category: ObjectId category of the product
 * stock: Number count of the product in the inventory
 * sold: Number of the product sold
 * photo: Buffer photo of the product
 */ 
const productSchema = new mongoose.Schema({
  name: {
    type: String,//string name of the product
    trim: true,//trimming the space in the string passed
    required: true,//For making it mandatory to pass this field 
    maxLength: 32,//For maximum length for the name of the product 
  },
  description: {
    type: String,//string description of the product
    trim: true,//trimming the space in the string passed
    required: true,//For making it mandatory to pass this field 
    maxLength: 2000,//For maximum length of the description of the product
  },
  price: {
    type: Number,//number price of the product
    required: true,//For making it mandatory to pass this field
    maxLength: 32,//For maximum length of the product
    trim: true,//trimming the space in the string passed
  },
  category: {
    type: ObjectId,//ObjectId category of the object
    ref: "Category",//referring categorySchema
    required: true,//For making category field mandatory
  },
  stock: {
    type: Number,//number - quantity of product in the inventory
  },
  sold: {
    type: Number,//number of product sold
    default: 0,//initiating the count to 0 for every newly created product
  },
  photo: {
    data: Buffer,//Buffer data type for image
    contentType: String,//string content type
  },
}, {
  timestamps: true//To create the time stamp for createAT and UpdateAT to be stored in the database
});
//Exporting the category schema as "Category"
module.exports = mongoose.model("Product", productSchema);