const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const reportsController = require("../controllers/reports");
const { ensureAuth } = require("../middleware/auth");

// Report Routes - simplified for now
router.post("/createReport/:id", upload.single("file"), reportsController.createReport); // route to create a report

//Get report for specific visit
router.get("/:id", ensureAuth, reportsController.getReport);

module.exports = router;
