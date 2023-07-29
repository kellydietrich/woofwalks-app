const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  breed: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Owner",
  // },
  likes: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Pet", PetSchema);
