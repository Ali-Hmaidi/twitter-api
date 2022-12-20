const HiddenTweets = require("../models/HiddenTweets");
const Tweets = require("../models/Tweets");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const hideTweet = async (req, res) => {
  req.body.userId = req.user.userId;

  const temp = await Tweets.findOne({ _id: req.body.tweetId });

  if (temp) {
    const temp = await HiddenTweets.find({
      tweetId: req.body.tweetId,
      userId: req.user.userId,
    });

    const count = temp.length;
    if (count < 1) {
      const tweet = await HiddenTweets.create(req.body);
    } else {
      res.status(StatusCodes.OK).send();
    }
  } else {
    throw new BadRequestError("cant find the tweet");
  }
};

const unhideTweet = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const id = await HiddenTweets.findOne({
    tweetId: req.body.tweetId,
    userId: userId,
  });

  if (id.userId != userId) {
    throw new BadRequestError("a user can only unhide tweets that he hide");
  }

  const tweet = await HiddenTweets.findByIdAndRemove({
    _id: id._id,
  });

  if (!tweet) {
    throw new NotFoundError(`no tweet with id ${tweetId} is hidden`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  unhideTweet,
  hideTweet,
};
