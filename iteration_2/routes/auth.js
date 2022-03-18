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
//Using the signOut, signIn, signUp and isSignedIn modules from auth controllers
const { signOut, signUp, signIn, isSignedIn } = require("../controllers/auth");
// Importing the express-validator
const { check, validationResult } = require("express-validator");

//Post request for signUp route
router.post(
  "/signUp",
  [ //checking user first name at least 3 characters
    check("firstName", "name should be at least 3 characters").isLength({
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
    //checking the phone number is numeric and at least 10 
    check("phoneNumber", "Phone number should be 10 number only")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),//phone number is exactly 10 numbers
  ],
  signUp
);
/**
 * Post route for signIn routes
 */
router.post(
  "/signIn",
  [ //Validating the email
    check("email", "email is required").isEmail(),
  ],
  signIn
);

// Get route for the signOut for the signIn User
router.get("/signOut", signOut);

router.get("/isSignedIn",isSignedIn,(req,res)=>{
  res.send("It's a protected route")
})

//Exporting the router
module.exports = router;
