const mongoose = require("mongoose");

const TweetsSchema = new mongoose.Schema({
  UserId: String,

  Description: {
    type: String,
    required: [true, "MUST PROVIDE tweet body"],
    trim: true,
    maxlength: [1000, "the tweet can not be more than 1000 characters"],
  },

  Hashtag: {
    type: String,
    trim: true,
    maxlength: [100, "the Hashtag can not be more than 100 characters"],
  },

  Date: Date,
});

module.exports = mongoose.model("Tweet", TweetsSchema);
