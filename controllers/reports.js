const cloudinary = require("../middleware/cloudinary"); // use cloudinary for media uploads
const Report = require("../models/Report"); // use Report models to communicate with DB
const Visit = require("../models/Visit");

module.exports = {
  createReport: async (req, res) => { // controls creating a new Report
    try {
      // id parameter comes from the pet routes
      // router.get("/:id", ensureAuth, petsController.getPet);
      // ex. http://localhost:2121/post/27981had972392hs7s8d
      // id === 27981had972392hs7s8d
      const result = await cloudinary.uploader.upload(req.file.path);
      const petUpdate = await Visit.findById(req.params.id).populate('pet');
      await Visit.findByIdAndUpdate(
        req.params.id,
        { $set: { completed: true } }, // Mark visit completed 
        { new: true }
      );
      await Report.create({  // form to Create Report 
        report: req.body.report,
        numberOne: req.body.numberOne, // Log if pet went #1
        numberTwo: req.body.numberTwo, // Log if pet went #2
        visitId: req.params.id,
        pet: petUpdate.pet.id, // assign the Report to the pet via unique id to-do 8/9
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
      
      console.log("Report has been added!"); // log success
      res.redirect("/pet/"+petUpdate.pet.id); // reload the pet's page
    } catch (err) {
      console.log(err);
    }
  },
  getReport: async (req, res) => { // controls loading the logged-in user's profile
    try {
      // Since we have a session, each request (req) contains the 
      // logged-in users info: req.user
      // note: console.log(req.user) to see everything
      const report = await Report.findOne({ visitId: req.params.id }).lean(); // Grabbing just the pets of the logged-in user
      console.log(report)
      res.render("report.ejs", { report: report }); 
    } catch (err) {
      console.log(err);
    }
  },
};
