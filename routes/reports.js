const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Report Routes - simplified for now
router.post("/createReport/:id", reportsController.createReport); // route to create a report


module.exports = router;
