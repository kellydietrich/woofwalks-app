const Visit = require("../models/Visit");
const Pet = require("../models/Pet");
const User = require("../models/User");
const Request = require("../models/Request")


module.exports = {
  createVisit: async (req, res) => { // controls creating a visit (currently located on pet's page /pet/:id)
    try {
      await Visit.create({
        walkerSelect: req.body.walkerSelect, // grab walker's unique id from selection menu
        visitDateTime: req.body.visitDateTime, // grab date & time from datepicker
        user: req.user.id, // grab user scheduling the visit
        pet: req.params.id, // grab pet visit is being scheduled for 
        accepted: false,
      });
      console.log(req.body)
      console.log("Visit has been scheduled!");
      res.redirect("/pet/"+req.params.id); // reload pet's page after success
    } catch (err) {
      console.log(err);
    }
  },
  acceptVisit: async (req, res) => { // controls creating a visit (currently located on pet's page /pet/:id)
    try {
      await Visit.findOneAndUpdate(
        { _id: req.params.id }, // grab id from the accept button / visit routes
        {
          $set: { accepted: true },
        },
        { new: true }
      )
      console.log("Visit has been scheduled!");
      res.redirect("/profile"); // reload profile page after success
    } catch (err) {
      console.log(err);
    }
  },
  deleteVisit: async (req, res) => {
    try {
      // Grab visit by unique id
      let visit = await Visit.findById({ _id: req.params.id });
      let pet = await Pet.findById(visit.pet);
      await Visit.remove({ _id: req.params.id }); // remove visit whose id matches the id from the delete request params
      console.log("Deleted Scheduled Visit");
      res.redirect(`/pet/${pet._id}`);
    } catch (err) {
      console.log(err);
    }
  },
};