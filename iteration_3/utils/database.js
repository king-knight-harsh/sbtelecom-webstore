//Importing dotenv
require("dotenv").config();
//Importing mongoose for connecting the db
const mongoose = require("mongoose");


/**
 * A function to stablish a connection with a MongoDB instance.
 */
 async function connectToDB() {
    try {
            //Database connection using mongoose
        await mongoose
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
    } catch (err) {
        throw err;
    } 
}


/**
 * Closes the DB connection.
 */
 async function closeDBConnection(){
        await mongoose.connection.close();
        return 'Connection closed';    
};

module.exports = {connectToDB, closeDBConnection}