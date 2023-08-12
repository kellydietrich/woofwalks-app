const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  report: {
    type: String,
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
  },
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Visit",
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  numberOne: {
    type: Boolean,
    required: true,
  },
  numberTwo: {
    type: Boolean,
    required: true,
  },
  // food: {
  //   type: Boolean,
  //   required: true,
  // },
  // water: {
  //   type: Boolean,
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
