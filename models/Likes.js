const mongoose = require("mongoose");

const LikesSchema = new mongoose.Schema({
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

LikesSchema.index(
  { userId: 1, tweetId: 1 },
  { unique: [true, "already liked before"] }
);

module.exports = mongoose.model("Likes", LikesSchema);
