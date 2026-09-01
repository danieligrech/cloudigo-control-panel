//Mongoose - the library that allows us to define schemas and communicate with MongoDB using JS objects instead of having to write raw database queries
const mongoose = require('mongoose');

//mongodb-memory-server - allows us to run a MongoDB server inside of the RAM
const { MongoMemoryServer } = require('mongodb-memory-server');

//This is a variable used just in case for manual termination of the MongoDB server.
let memoryServer;

//This is the function that this file exists to provide.  Note: its async because it needs time to connect to the database
async function connectToDB(){
    //process.env is Node.js's way of reading environment variables.  Values that exist outside of the code itself, either set in a .env file or by whoever is running the app.
    const uriFromEnv = process.env.MONGODB_URI;

    //Cases
    //Case 1: An actual connection string was provided in the environment variables.
    if(uriFromEnv){
        console.log("Connecting to MongoDB using MONGODB_URI");

        //Await pauses this function until a successful or failed connection is made to the database.
        await mongoose.connect(uriFromEnv);
        console.log("Connected to MongoDB");
    }

    //Case 2: No connection string was provided, so an in-memory MongoDB server will be started and connected to
    else{
        console.log("No MONGODB_URI provided, starting in-memory MongoDB server");

        //This creates and starts a temporary MongoDB server in the RAM.
        memoryServer = await MongoMemoryServer.create();

        //Once this runs, it is asked for its own connection string
        const memoryURI = memoryServer.getUri();

        //Now Mongoose will be connected to this address instead.
        await mongoose.connect(memoryURI);
        console.log("Connected to the in-memory MongoDB server");
    }
}

//Lastly, this line of code makes it so connectToDB can be imported and used in other files.
module.exports = { connectToDB };