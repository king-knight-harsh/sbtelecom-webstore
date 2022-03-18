/**
 * Script to create the schema for category of the products
 * For example -> category: Monitor could have different size and
 * monitors like Samsung 27 inch monitor or AOC 21 inch monitor
 */

// Importing the mongoose package to create schema  
const mongoose = require("mongoose");

/**
 * Creating the category schema with parameter as follows
 * name - String Name of the product 
 */
const categorySchema = new mongoose.Schema({
  name: {
    type: String,//String type for the name
    trim: true,//For trimming any space provided in the string 
    required: true,//For making this field mandatory to pass for creating the category
    maxLength: 32,//For making the max length of the string as 32
    unique: true,//To avoid duplicate names to be stored in the dataBase
  },
}, {
  timestamps: true//To create the time stamp for createAT and UpdateAT to be stored in the db
});
//Exporting the category schema as "Category"
module.exports = mongoose.model("Category", categorySchema);