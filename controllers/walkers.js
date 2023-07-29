const User = require("../models/User");
const Request = require("../models/Request");

module.exports = {
    getWalkers: async (req, res) => { // controls loading the list of available walkers 
      try {
        let walkers = await User.find({ clientProfile: false }); // grab any users who didn't select client profile
        res.render("feed.ejs", { walkers: walkers }); // pass that info to the feed view
      } catch (err) {
        console.log(err);
      }
    },
    requestWalker: async (req, res) => { // controls sending a walker a request to be a client 
      try {
      await Request.create({
        sender: req.user.id, // grab user submitting the request
        receiver: req.params.id, // grab walker request is for 
        type: 'friend',
        rejected: false, 
        responded: false,
        accepted: false,
        // To Do 7/26 : make requests visible based on 'responded' property, edit model & view
      });
        console.log("Walker Request Sent!"); // log success
        res.redirect('/profile'); // redirect to user's profile page
      } catch (err) {
        console.log(err);
      }
    },
    acceptRequest: async (req, res) => { // controls accepting the client request as a walker
      try {
        await Request.findOneAndUpdate(
          { _id: req.params.id }, // grab id from the accept button / request routes
          {
            $set: { accepted: true, responded: true },
          }
        );
        console.log("Request Accepted!");
        res.redirect('/profile');
      } catch (err) {
        console.log(err);
      }
    },
    denyRequest: async (req, res) => { // controls denying the client request as a walker
      try {
        await Request.findOneAndUpdate( 
          { _id: req.params.id },     // grab id from the deny button / request routes
          {
            $set: { rejected: true, responded: true },
          }
        );
        console.log("Request Denied!");
        res.redirect('/profile');
      } catch (err) {
        console.log(err);
      }
    },
  };