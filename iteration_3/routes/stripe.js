//Importing the payment methop from the stripe controller
const { payment } = require("../controllers/stripe");
//Importing the express library
const router = require("express").Router();

//payment gateway
router.post("/payment", payment);

module.exports = router;
