/**
 * Script to import all the required packages, middleware, models
 * Script to create express server and connecting to the mongoDB server
 */
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

const database = require("./utils/database");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

var server;

function createServer() {
	try {
		database.connectToDB();

		app.use(bodyParser.json());
		app.use(cookieParser());
		app.use(cors());
		app.use("/api/auth", authRoute);
		app.use("/api/users", userRoute);
		app.use("/api/products", productRoute);
		app.use("/api/carts", cartRoute);
		app.use("/api/orders", orderRoute);
		app.use("/api/checkout", stripeRoute);

		//Storing the port number in the variable port
		const port = process.env.PORT || 5000;

		//Logging the main routes to the website and website documentation
		server = app.listen(port, () => {
			console.log(`APP IS RUNNING AT http://localhost:${port}/`);
		});
	} catch (err) {
		console.error(err);
	}
}

/**
 * Method helps to close the mongoDB connection properly
 * when clicked CTRL+C and avoid to use all are computer
 * resources
 */
process.on("SIGINT", () => {
	console.info("\nSIGINT signal received.");
	console.log("Closing Mongo Client.");
	server.close(async function () {
		let msg = await database.closeDBConnection();
		console.log(msg);
	});
});

createServer();

module.exports = app;
