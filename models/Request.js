const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accepted: {
    type: Boolean, 
    unique: false,
  },
  pending: {
    type: Boolean,
    unique: false,
  },
  type: {
    type: String, 
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Request", RequestSchema);