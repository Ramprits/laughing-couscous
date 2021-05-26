const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    name: String,
    about: String,
    photo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Owner", ownerSchema);
