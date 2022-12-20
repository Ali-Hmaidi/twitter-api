const Follower = require("../models/Followers");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { find } = require("../models/Followers");
const Tweets = require("../models/Tweets");

const addFollower = async (req, res) => {
  req.body.followerId = req.user.userId;

  const temp = await Follower.find({
    followerId: req.user.userId,
    followedId: req.body.followedId,
  });

  const count = temp.length;

  if (count < 1) {
    const follower = await Follower.create(req.body);
    res.status(StatusCodes.CREATED).json({ follower });
  } else {
    throw new BadRequestError("already followed");
  }
};
const deleteFollower = async (req, res) => {
  const {
    user: { userId },
    params: { id: followedId },
  } = req;

  const unfollow = await Follower.findOneAndRemove({
    followerId: userId,
    followedId: followedId,
  });

  res.status(StatusCodes.OK).send();
};

const getFollowedUsersTweets = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const followedUsersarray = await Follower.find({ followerId: userId });

  const followedUsersIds = followedUsersarray.map((temp) => {
    return temp.followedId;
  });

  var i;
  var tweets = [];
  for (i = 0; i < followedUsersIds.length; i++) {
    tweets = tweets.concat(
      await Tweets.find({ createdBy: followedUsersIds[i] })
    );
  }

  //const tweets = await Tweets.findById({ createdBy: );

  res.status(StatusCodes.OK).json({ tweets });
};

module.exports = {
  addFollower,
  deleteFollower,
  getFollowedUsersTweets,
};
