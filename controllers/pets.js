const cloudinary = require("../middleware/cloudinary"); // use cloudinary for media uploads
const Pet = require("../models/Pet");
const User = require("../models/User");
const Request = require("../models/Request");
const Report = require("../models/Report");
const Visit = require("../models/Visit"); // use visit, report, request, user, and pet models for these controllers

module.exports = {
  getPet: async (req, res) => { // controls showing the info on individual pets (currently found by clicking pet's pic in profile 7/26)
    try {
      // id parameter comes from the pet routes
      // router.get("/:id", ensureAuth, petsController.getPet);
      // ex. http://localhost:2121/post/27981had972392hs7s8d
      // id === 27981had972392hs7s8d
      const pet = await Pet.findById(req.params.id);
      // To-Do 7/28: move these to different controller
      const reports = await Report.find({pet: req.params.id}).sort({ createdAt: "desc" }).lean(); // grab all reports for that pet, from oldest to newest
      const visits = await Visit.find({pet: req.params.id}).sort({ createdAt: "desc" }).populate('walkerSelect').lean(); // find all scheduled visits for that pet, sorted from oldest to newest (based on date created 7/26 todo)
      const accepted = await Request.find({ sender: req.user.id, accepted: true }).populate('receiver').lean(); // get all walkers available to schedule a visit with pet
      res.render("pet.ejs", { pet: pet, user: req.user, reports: reports, visits: visits, accepted: accepted }); // take all pet, report, visit, walker data gathered and render the view
    } catch (err) {
      console.log(err);
    }
  },
  createPet: async (req, res) => { // controls adding a new pet to user profile
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      //media is stored on cloudinary - the above request responds with url to media and the media id that you will need when deleting comment
      await Pet.create({ // make a new Pet document in MongoDB
        petName: req.body.petName, 
        image: result.secure_url,
        likes: 0,
        cloudinaryId: result.public_id,
        breed: req.body.breed,
        user: req.user.id,
      });
      console.log("Pet has been added!"); // log success 
      res.redirect("/profile"); // reload user's profile to reflect the changes -> todo 7/26
    } catch (err) {
      console.log(err);
    }
  },
  likePet: async (req, res) => { // controls incrementing the likes - ignore for now 7/26
    try {
      await Pet.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/pet/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePet: async (req, res) => { // controls removing the pet from the DB & cloudinary
    try {
      // Find pet by id
      let pet = await Pet.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(pet.cloudinaryId);
      // Delete pet from db
      await Pet.remove({ _id: req.params.id }); // remove the Pet document whose id matches the id from the requesting url 
      console.log("Deleted Pet");
      res.redirect("/profile"); // reload the user's profile to reflect the changes - todo 7/26
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
