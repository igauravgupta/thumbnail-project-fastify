const mongoose = require("mongoose");

const thumbnailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
});

const Thumbnail = mongoose.model("Thumbnail", thumbnailSchema);

module.exports = { Thumbnail };
