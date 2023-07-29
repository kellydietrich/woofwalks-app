const express = require("express"); 
const router = express.Router(); // use express' Router 
const visitsController = require("../controllers/visits"); // route communicates with controller
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // ensure user is logged in

//Visit Routes - simplified for now 
router.post("/createVisit/:id", visitsController.createVisit); // route to create a visit -> /visit/createVisit/:id

//Enables user to delete visit. In controller, uses POST model to delete visit document from MongoDB collection
router.delete("/deleteVisit/:id", visitsController.deleteVisit); 

module.exports = router;
