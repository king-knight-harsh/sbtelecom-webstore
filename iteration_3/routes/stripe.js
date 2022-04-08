const { payment } = require("../controllers/stripe");
const router = require("express").Router();

//payment gateway
router.post("/payment", payment);

module.exports = router;
