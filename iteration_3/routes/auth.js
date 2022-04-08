/**
 * Script with all routes related to authentication:
 * /api/signup - route for signup new user
 * /api/signIn - route for signIn the user
 * /api/signOut - route for signOut the user
 */

//Importing the express library
var express = require("express");
//Using the routers for the router
var router = express.Router();
const {register, login} = require("../controllers/auth");
// Importing the express-validator
const { check, validationResult } = require("express-validator");

//REGISTER
router.post("/register",
[ //checking user first name at least 3 characters
  check("username", "name should be at least 3 characters").isLength({
    min: 3,
  }),
  //checking email provided is actual email
  check("email", "email is required").isEmail(),
  //Checking if the password enter meet all the requirements
  check(
    "password",
    `Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.`
  )
    .isLength({
      min: 8,
    })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
],register);

//LOGIN

router.post("/login", login);
module.exports = router;
