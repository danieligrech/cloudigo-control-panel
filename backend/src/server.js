//Loads any variables in the .env file into process.env so the code can read them.
require('dotenv').config();

//Express is the framework that allows us to define API routes, and handle HTTP requests from Angular
const express = require("express");

//CORS - Cross-Origin Resource Sharing - is a security feature that prevents websites from making requests to other websites.
//This is a problem for us because our Angular frontend will be running on a different port than our backend, so we need to allow it to make requests to the backend.
const cors = require("cors");

//Pulling the function written in db.js
const { connectToDB } = require("./db");

//Creates an express app.  This is what the routes and middleware will be attached to.
const app = express();

//Tells express to allow cross-origin requests
app.use(cors());

//Tells express to automatically parse JSON in the bodies of incoming requests (e.g. POST requests)
app.use(express.json());

//process.env.PORT lets whoever is running this app to choose a different port if they want to.  If they don't, it will default to 3000.
const port = process.env.PORT || 3000;

//Wrapping the startup code in an async function so await can be utilised.
async function startServer(){
    //The code will wait here until a connection to the database is made before continuing.
    await connectToDB();

    //After the database connection is successfully made, we tell express to start listening for incoming requests on the chosen port.
    app.listen(PORT, () => {
        console.log("Server is running on http://localhost:${PORT}");
    });
}

//Calling the function to start the server
startServer();
