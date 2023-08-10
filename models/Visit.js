const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  // image: {
  //   type: String,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
  // completed: {
  //   type: Boolean,
  //   required: true,
  // },
  // canceled: {
  //   type: Boolean,
  //   required: true,
  // },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  walkerSelect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  accepted: {
    type: Boolean, 
    unique: false,
  },
  pending: {
    type: Boolean,
    unique: false,
  },
  canceled: {
    type: Boolean, 
    unique: false,
  },
  visitDateTime: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Visit", VisitSchema);
