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
 * username: String first name of the user
 * email: String email address for the user
 * userInfo: String description/information about the user
 * encry_password: String encrypted password for the user
 * salt: String salt for the password for the user
 * role: Number for role for the user (0 being the regular user || 1 being the admin user)
 * purchases: Array of product purchases by user
 */
const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		encry_password: {
			type: String,//string of the encrypted password with salt 
			required: true,//For making the field mandatory
		  },
		salt: String,
		isAdmin: {
			type: Boolean,
			default: false,
		},
		img: { type: String },
	},
	{ timestamps: true }
);

//Virtual field for getting the password and encrypting the password
UserSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();//creating the salt for the password
    this.encry_password = this.securePassword(password);//calling securePassword method to secure the password
  })
  .get(function () {
    return this._password;//returning the password
  });

UserSchema.methods = {
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

module.exports = mongoose.model("User", UserSchema);
