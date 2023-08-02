const User = require("../models/User");
const Request = require("../models/Request");

module.exports = {
    getWalkers: async (req, res) => { // controls loading the list of available walkers 
        try {
        let walkers = await User.find({ clientProfile: false, _id: { $ne: req.user.id } }); // grab any users who didn't select client profile (except the logged in user when applicable)
        let user = await User.findOne({ _id: req.user.id });
        console.log(walkers)
        res.render("feed.ejs", { walkers: walkers, user: user }); // pass info to the feed view
        } catch (err) {
          console.log(err);
        }
      },
    requestConnect: async (req, res) => { // controls sending a walker a request to be a client 
        try {
        await Request.create({
        sender: req.user.id, // grab user submitting the request
        receiver: req.params.id, // grab walker request is for 
        type: 'friend',
        rejected: false, 
        responded: false,
        accepted: false,
      });
        console.log("Walker Request Sent!"); // log success
        res.redirect('/profile'); // redirect to user's profile page
      } catch (err) {
        console.log(err);
      }
    },
    acceptConnect: async (req, res) => { // controls accepting the client request as a walker
      try {
        let request = await Request.findById({ _id: req.params.id }).populate('sender', 'receiver');
        const sender = request.sender
        const receiver = request.receiver
        await User.findByIdAndUpdate(
          sender._id,
          { $push: { connections: receiver } }, // Push the receiver's ID into the sender's connections array
          { new: true }
        )
        await User.findByIdAndUpdate(
          receiver._id,
          { $push: { connections: sender } }, // Push the sender's ID into the receiver's connections array
          { new: true }
        )
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
    denyConnect: async (req, res) => { // controls denying the client request as a walker
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