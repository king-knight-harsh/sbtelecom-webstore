// Importing the libraries and passwords
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

/**
 * Call method for getting the payment from the strip module
 * @param {*} req - request from client side
 * @param {*} res - response from the server side
 * @return err: Unsuccessful attempt to get any payment from the client side
 * @return user: Successful attempt - JSON response with stripe error
 */
exports.payment = (req, res) => {
	stripe.charges.create(
		{
			source: req.body.tokenId,
			amount: req.body.amount,
			currency: "usd",
		},
		(stripeErr, stripeRes) => {
			if (stripeErr) {
				res.status(500).json(stripeErr);
			} else {
				res.status(200).json(stripeRes);
			}
		}
	);
};
