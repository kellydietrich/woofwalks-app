const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pets: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Owner", OwnerSchema);
