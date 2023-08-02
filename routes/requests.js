const express = require("express");
const router = express.Router();
const requestsController = require("../controllers/requests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Get All Walkers
router.get("/", requestsController.getWalkers);

// Connection Request Routes
router.post("/requestConnect/:id", requestsController.requestConnect); // route to request a walker connection. In controller, uses POST model to push request into requests array.
router.put("/acceptConnect/:id", requestsController.acceptConnect); // walker accepts or denies request
router.put("/denyConnect/:id", requestsController.denyConnect);

module.exports = router;