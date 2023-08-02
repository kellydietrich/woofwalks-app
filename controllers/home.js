const Pet = require("../models/Pet");
const User = require("../models/User");
const Request = require("../models/Request");
const Visit = require("../models/Visit");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs"); // log in page
  },
  getProfile: async (req, res) => { // controls loading the logged-in user's profile
    try {
      // Since we have a session, each request (req) contains the 
      // logged-in users info: req.user
      // note: console.log(req.user) to see everything
      let pets = await Pet.find({ user: req.user.id }); // Grabbing just the pets of the logged-in user 
      let requests = await Request.find({ receiver: req.user.id }).populate('sender').lean();
      let user = await User.findOne({ _id: req.user.id }).populate('connections').lean();
      let visits = await Visit.find({ walkerSelect: req.user.id }).sort({ createdAt: 'desc' }).populate('user').lean(); // find all visit requests, sorted from oldest to newest (based on date created as of 7/26)
      console.log(user)
      console.log(visits)
      //Sending pet, visit, user & request data from MongoDB and user data to ejs template
      res.render("profile.ejs", { pets: pets, user: user, requests: requests, visits: visits }); 
    } catch (err) {
      console.log(err);
    }
  },
};
