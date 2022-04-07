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
// Importing the database from utils
const database = require("./utils/database");

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

var server 

function createServer() {
  try {
    
    database.connectToDB()
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

    //Logging the main routes to the website and website documentation
    server = app.listen(port, () => {
      console.log(`APP IS RUNNING AT http://localhost:${port}/`);
      console.log(`SWAGGER DOCS ARE ACCESSIBLE AT http://localhost:${port}/api/docs/`);
    });
  } catch (err) {
    console.err(err);
  }
}

/**
 * Method helps to close the mongoDB connection properly
 * when clicked CTRL+C and avoid to use all are computer 
 * resources
 */
process.on('SIGINT', () => {
  console.info('\nSIGINT signal received.');
  console.log('Closing Mongo Client.');
  server.close(async function(){
    let msg = await database.closeDBConnection();
    console.log(msg);
  });
});


createServer();
module.exports = app;