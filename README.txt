Cloudigo Control Panel - Daniel Grech Desira

In this project, I have coded both the front-end and the back-end for a control panel a Cloudigo admin would use to look at current offers, add new offers, and mark offers as active and inactive.

-----

Setup Instructions
1. Have Node.js pre-installed on your device
2. Clone the repository

3. Start the backend first using the following commands in the Visual Studio Code terminal:
3.1. cd backend
3.2. npm install
3.3. npm start

4. Start the frontend using a different Visual Studio Code terminal and put in the following commands:
4.1. cd frontend
4.2. npm install
4.3. ng serve

5. Use the app, the app should be free to use after pasting the following on your browser: "http://localhost:4200"

-----

Data Field Decisions

In this section, I will list down every offer included in the schema and why it is there

- storeName: The name of the store.  Important as it is the identifier telling you what the name of the store is

- discountType: In this field, I listed if offers are either a percentage based offer or a custom offer.  From observing the app, I could tell that all offers are either offers that give the customer a percentage decrease in their total bill, or a custom offer where the customer will get benefits if a pre-requisite is met, for example the offer of "Buy 1 get 1 free"

- discountValue: In this field, an admin can only alter this if the offer is a percentage based offer.  This is so the admin can set the percentage their self for the offer

- customOffer: This field has the same concept as the discountValue field, only this one is used for custom offers only and allows the admin/s to add their customized offer

- userTier: This field allows the admin to set whether an offer is only available to certain tiers or not.  The tiers are standard, premium and corporate.

- offerLimit: This field is for offers that have a limited amount of uses.  During my time exploring the Cloudigo application.

- offerLimit.limitType: This field is a part of offerLimit and is used to identify if an offer is a limited offer or a recurring offer. I noticed on the application that some of the offers either have a limited use, or a limited use that resets after a certain limit (e.g. monthly).

- offerLimit.period: This field is part of offerLimit and is only used when an offer is recurring as its the identifier for when a recurring offer resets (weekly, monthly, annually).

- offerLimit.count: This field is part of offerLimit and is the total amount before an offer expires.  This means that if an offer has a count of for example 3, if its a limited offer it will expire after 3 uses, and if its a recurring offer it will expire after 3 uses and will refresh based off what the period is.

- loyaltyLadder: This field is for the loyalty ladder.  Some of the offers I noticed have a loyalty ladder included in them where the more times an offer is used the more benefits they will receive.

- daysValid: This field is to show what days of the week an offer is valid.  Some of the offers I noticed are for example only allowed to be used from Monday - Thursday, or Friday - Sunday so this field is used for that.

- redemptionMode: This field determines if an offer can be used either in-person at a store or online.

- minimumSpent: This field allows an admin to add a minimum spending amount on an offer, as some offers observed on the application do have a minimum spending amount before being used.

- maxPeople: This field allows an admin to add a limit on how many people can redeem one offer.  If lets say a group of 10 people are at a restaurant and an offer they want to use has a maximum amount of 3-4, then that group won't be able to redeem that offer.

- offerExpiry:  This field is an internal field and is the determining factor over when an offer expires or not.  I speculate that when Cloudigo makes a deal with a company and adds offers from that shop onto the application, an internal date planned by both parties is coded into the offer where an admin can see when an offer is set to expire.

- offerStatus: This field is also internal and is used by an admin to de-activate an active offer or activate an inactive offer.

-----

AI Tools Usage

Throughout this project, I have used Claude AI as both a teacher, guiding me how to use Angular, Node.js and Mongoose and also to review my code and as an assistant guiding me every time problems arose.
While I do understand the theory, I am inexperienced when it comes to the 3 technologies used so Claude has developed example code that I need and afterwards I put in frequent prompts to test me and let me continue the rest myself so I can learn more about coding using Angular, Node.js and Mongoose.  