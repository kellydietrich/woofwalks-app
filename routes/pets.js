const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const petsController = require("../controllers/pets");
const { ensureAuth } = require("../middleware/auth");


// Post Routes
// Since linked from server js, treat each path as 
// post/:id, post/createPet, post/likePet
router.get("/:id", ensureAuth, petsController.getPet); // route to pull up individual pet by unique ID

//Enables user to create pet file w/ cloudinary for media uploads
router.post("/createPet", upload.single("file"), petsController.createPet);

//Enables user to like pet. In controller, uses POST model to update likes by 1
router.put("/likePet/:id", petsController.likePet);

//Enables user to delete pet. In controller, uses POST model to delete pet from MongoDB collection
router.delete("/deletePet/:id", petsController.deletePet);

module.exports = router;
