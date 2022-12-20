const mongoose = require("mongoose");

const HiddenTweetsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "MUST PROVIDE user"],
  },

  tweetId: {
    type: mongoose.Types.ObjectId,
    REF: "Tweets",
    required: true,
  },
});

module.exports = mongoose.model("HiddenTweets", HiddenTweetsSchema);
