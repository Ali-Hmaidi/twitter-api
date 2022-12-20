const SavedTweets = require("../models/SavedTweets");
const Tweets = require("../models/Tweets");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const addTweet = async (req, res) => {
  req.body.userId = req.user.userId;

  const temp = await Tweets.findOne({ _id: req.body.tweetId });

  if (temp) {
    const temp = await SavedTweets.find({
      tweetId: req.body.tweetId,
      userId: req.user.userId,
    });

    const count = temp.length;
    if (count < 1) {
      const tweet = await SavedTweets.create(req.body);
      res.status(StatusCodes.CREATED).json({ tweet });
    } else {
      throw new BadRequestError("already added");
    }
  } else {
    throw new BadRequestError("cant find the tweet");
  }
};

const deleteTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req;

  const id = await SavedTweets.findOne({ tweetId: tweetId, userId: userId });
  if (id.userId != userId) {
    throw new BadRequestError("a user can only delete tweets that he created");
  }

  const tweet = await SavedTweets.findByIdAndRemove({
    _id: id._id,
  });

  if (!tweet) {
    throw new NotFoundError(`no tweet with id ${tweetId}`);
  }

  res.status(StatusCodes.OK).send();
};

const getAllTweets = async (req, res) => {
  const { page, pageSize } = req.query;
  const tweets = await SavedTweets.find({})
    .limit(Number(pageSize))
    .skip((Number(page) - 1) * Number(pageSize));
  res.status(StatusCodes.OK).json({ tweets });
};

module.exports = {
  addTweet,
  deleteTweet,
  getAllTweets,
};
