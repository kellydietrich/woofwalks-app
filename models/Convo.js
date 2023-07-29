const mongoose = require("mongoose");

const ConvoSchema = new mongoose.Schema({
  participants: {
    type: Object,
    required: true,
  },
  messages: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowecase plural of name
module.exports = mongoose.model("Convo", ConvoSchema);
