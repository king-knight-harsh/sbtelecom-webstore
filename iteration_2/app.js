/** 
 * Script to import all the required packages, middleware, models 
 * Script to create express server and connecting to the mongoDB server
*/ 



//Importing dotenv
require("dotenv").config();
//Importing mongoose for connecting the db
const mongoose = require("mongoose");
//Importing express to run server
const express = require("express");
// Importing the body-parser middleware to parse incoming request body
const bodyParser = require("body-parser");
// Importing the cookieParser middleware to parse cookies attach to the client request object
const cookieParser = require("cookie-parser");
// Importing the cors package to allow or restrict requested resources on a web serve
const cors = require("cors");
// Importing the SwaggersUI to access the documentation in proper form
const swaggerUi = require("swagger-ui-express");
// Importing yamljs to write swagger.yaml document
const YAML = require("yamljs");

//Calling express
const app = express();
// Loading the swagger.yaml file
const swaggerDocument = YAML.load("./swagger.yaml");

// Importing the authentication routes
const authRoutes = require("./routes/auth");
// Importing the user routes
const userRoutes = require("./routes/user");
// Importing the category routes
const categoryRoutes = require("./routes/category");
// Importing the product routes
const productRoutes = require("./routes/product");
// Importing the order routes
const orderRoutes = require("./routes/order");

//Database connection using mongoose
mongoose
  //location of the database is coming through .env file
  .connect(process.env.DATABASE)
  // logging the successful connection of the database in the console
  .then(() => {
    console.log("DB CONNECTED");
  })
  // logging the errors
  .catch((err) => {
    console.error(err);
  });

// Using the MiddleWares -> bodyParser, cookieParser and cors
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Using the /api-docs route to run the documentation part
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Using the the authentication routes
app.use("/api", authRoutes);
// Using the the user routes
app.use("/api", userRoutes);
// Using the the category routes
app.use("/api", categoryRoutes);
// Using the the product routes
app.use("/api", productRoutes);
// Using the the order routes
app.use("/api", orderRoutes);

//Storing the port number in the variable port
const port = process.env.PORT || 8000;

//Logging the main routes to the website
app.listen(port, () => {
  console.log(`APP IS RUNNING AT http://localhost:${port}/`);
});

module.exports = app;