const mongoose = require("mongoose");

const TweetsSchema = new mongoose.Schema(
  {
    //userId
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "MUST PROVIDE user"],
    },

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetsSchema);
