const Report = require("../models/Report"); // use Report models to communicate with DB
const Visit = require("../models/Visit");

module.exports = {
  createReport: async (req, res) => { // controls creating a new Report
    try {
      // id parameter comes from the pet routes
      // router.get("/:id", ensureAuth, petsController.getPet);
      // ex. http://localhost:2121/post/27981had972392hs7s8d
      // id === 27981had972392hs7s8d
      await Report.create({  // form to Create Report 
        report: req.body.report,
        numberOne: req.body.numberOne, // Log if pet went #1
        numberTwo: req.body.numberTwo, // Log if pet went #2
        visitId: req.params.id,
        pet: req.params.id, // assign the Report to the pet via unique id to-do 8/9
      });
      console.log("Report has been added!"); // log success
      res.redirect("/pet/"+req.params.id); // reload the pet's page
    } catch (err) {
      console.log(err);
    }
  },
};
