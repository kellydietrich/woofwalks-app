const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  convoId: {
    type: Date,
    default: Date.now,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Message", MessageSchema);
