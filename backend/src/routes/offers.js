//Router lets us group together related endpoints for organizational purposes.
const express = require("express");
const router = express.Router();

//The model is needed to read and write offers in the database.
const Offer = require("../models/Offer");

//GET /api/offers
//Returns all offers in the database
router.get("/", async (req, res) => {
    try{
        //find() - finds all documents in the Offer collection
        const offers = await Offer.find();

        //200 - standard HTTP status code for a successful GET request
        res.status(200).json(offers);
    } catch (error) {
        //500 - standard HTTP status code for an internal server error, not a client error
        res.status(500).json({ error: "An error has occurred while fetching offers..." });
    }
});

//POST /api/offers
//Creates a new offer in the database
router.post("/", async (req, res) => {
    try{
        //req.body - the JSON data sent in by Angular
        const newOffer = new Offer(req.body);

        //save() - triggers all schema validation.  If anything fails, it will go to the catch block below.
        const savedOffer = await newOffer.save();

        //201 - standard HTTP status code for a successful POST request
        res.status(201).json(savedOffer);
    } catch (error) {
        if(error.name === 'ValidationError'){
            //400 - standard HTTP status code for a bad request, usually due to validation errors
            res.status(400).json({ error: error.message });
        } else {
            //500 - standard HTTP status code for an internal server error
            res.status(500).json({ error: "An error has occurred while creating the offer..." });
        }
    }
});

//PATCH /api/offers/:id/status
//Updates the status of an offer in the database (active vs inactive)
router.patch("/:id/status", async (req, res) => {
    try{
        //:id in the route path becomes available as req.params.id
        const offer = await Offer.findById(req.params.id);

        //findById() returns null if no document is found, so we check for that and return a 404 if needed.
        if(!offer){
            //404 - standard HTTP status code for a resource not found
            return res.status(404).json({ error: "Offer not found" });
        }

        //The toggle itself, flipping the boolean value of offerStatus
        offer.offerStatus = !offer.offerStatus;

        //save() - saves the changes to the database
        const updatedOffer = await offer.save();

        //200 - standard HTTP status code for a successful PATCH request
        res.status(200).json(updatedOffer);
    } catch (error) {
        //400 - standard HTTP status code for a malformed request, usually due to an invalid ID format, similar to the validation error catch we have in the POST route.
        if(error.name === "CastError"){
            res.status(400).json({ error: "Invalid offer ID format" });
        } else {
            //500 - standard HTTP status code for an internal server error
            res.status(500).json({ error: "An error has occurred while updating the offer status..." });
        }
    }
});

//Exporting the router so it can be used in server.js
module.exports = router;