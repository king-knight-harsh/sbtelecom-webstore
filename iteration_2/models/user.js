/**
 * Script to create the schema for user
 */

// Importing the mongoose library to create schema  
var mongoose = require("mongoose");
// Importing the crypto library for encrypting the data
const crypto = require("crypto");
// Import uuidv4 library to generate salt 
const {
  v4: uuidv4
} = require("uuid");
/**
 * Creating the userSchema with parameter as follows:
 * firstName: String first name of the user
 * lastName: String last name of the user
 * email: String email address for the user
 * phoneNumber: Number phoneNumber for the user 
 * userInfo: String description/information about the user
 * encry_password: String encrypted password for the user
 * salt: String salt for the password for the user
 * role: Number for role for the user (0 being the regular user || 1 being the admin user)
 * purchases: Array of product purchases by user
 */
var userSchema = new mongoose.Schema({
  firstName: {
    type: String,//string name of the user
    required: true,//For making the field mandatory
    maxLength: 32,//Maximum length of the user firstName string
    trim: true,//Trimming the spaces in the firstName string
  },
  lastName: {
    type: String,//string name of the user
    maxLength: 32,//Maximum length of the user lastName string
    trim: true,//Trimming the spaces in the lastName string
  },
  email: {
    type: String,//string email address of the user
    trim: true,//Trimming the spaces in the email address string
    required: true,//For making the field mandatory
    unique: true,//For making the field unique and avoid duplicate entry in the DB
  },
  phoneNumber: {
    type: Number,//phone number of the user 
    maxLength: 10,//MaxLength of the phoneNumber field
    trim: true,//Trimming the spaces in the phoneNumber field
    unique: true,//For making the field unique and avoid duplicate entry in the DB
    required: true,//For making the field mandatory
  },
  userInfo: {
    type: String,//string info of the user
    trim: true,//Trimming the spaces in the userInfo field
  },
  encry_password: {
    type: String,//string of the encrypted password with salt 
    required: true,//For making the field mandatory
  },
  salt: String,//string salt for the password
  role: {
    type: Number,//number as the role of the user
    default: 0,//default as 0 - regular user
  },
  purchases: {
    type: Array,//array of different products
    default: [],//initiating every new user with empty array
  },
}, {
  timestamps: true//To create the time stamp for createAT and UpdateAT to be stored in the database
});
//Virtual field for getting the password and encrypting the password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();//creating the salt for the password
    this.encry_password = this.securePassword(password);//calling securePassword method to secure the password
  })
  .get(function () {
    return this._password;//returning the password
  });

userSchema.methods = {
  /**
   * Method to the authenticate the password for the user in the dataBase
   * @param plainPassword - String user provided password
   * @returns boolean - True if password matches or false if password does not matches
   */
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },
  /**
   * Method to encrypt and decrypt the user provide password
   * @param plainPassword - String user provided password
   * @returns encrypted password for the user
   */
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)//using sha256 algorithm to encrypt the password
        .update(plainPassword)//updating the password if already exist
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);