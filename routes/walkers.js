const express = require("express");
const router = express.Router();
const walkersController = require("../controllers/walkers");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


// Get All Walkers
router.get("/", walkersController.getWalkers);

//Enables user to send meet & greet request. In controller, uses POST model to push request into requests array.
router.put("/requestWalker/:id", walkersController.requestWalker);
router.put("/acceptRequest/:id", walkersController.acceptRequest); // walker accepts or denies request
router.put("/denyRequest/:id", walkersController.denyRequest);

module.exports = router;
