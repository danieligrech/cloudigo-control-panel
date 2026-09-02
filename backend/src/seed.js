//Pulling in the Offer model
const Offer = require('./models/Offer');

//This function checks if the Offer collection is empty and if it is, a small amount of sample data is added to the database so the app is not blank on the first load/
async function seedOffersIfEmpty(){
    //countDocuments() - counts the number of documents in the Offer collection
    const offerCount = await Offer.countDocuments();

    if(offerCount > 0){
        console.log("There are already offers in the database, skipping seeding.");
        return;
    }

    console.log("No offers found in the database, seeding sample offers...");

    //insertMany() - inserts multiple documents into the Offer collection
    await Offer.insertMany([
        {
            storeName: "KFC",
            discountType: "percentage",
            discountValue: 10,
            userTier: ["standard", "premium", "corporate"],
            daysValid: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            redemptionMode: "in-person",
            offerLimit:{
                limitType: "limited",
                count: 1
            }
        },
        {
            storeName: "KFC",
            discountType: "percentage",
            discountValue: 20,
            userTier: ["premium", "corporate"],
            daysValid: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            redemptionMode: "in-person",
            loyaltyLadder: [10, 10, 15]
        },
        {
            storeName: "Starbucks",
            discountType: "percentage",
            discountValue: 10,
            userTier: ["corporate"],
            daysValid: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            redemptionMode: "in-person",
            offerLimit:{
                limitType: "recurring",
                period: "weekly",
                count: 1
            }
        }
    ]);

    console.log("Sample offers seeded successfully.");
}

module.exports = { seedOffersIfEmpty };