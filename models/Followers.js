const mongoose = require("mongoose");

const FollowersSchema = new mongoose.Schema({
  //Follower Id
  followerId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "MUST PROVIDE user"],
  },
  //Follower Id
  followedId: {
    type: String,
    required: true,
  },
});

FollowersSchema.index(
  { followerId: 1, followedId: 1 },
  { unique: [true, "already following"] }
);

module.exports = mongoose.model("Follower", FollowersSchema);
