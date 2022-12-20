const Tweet = require("../models/Tweets");
const HiddenTweets = require("../models/HiddenTweets");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllTweets = async (req, res) => {
  const { page, pageSize } = req.query;
  const tweets = await Tweet.find({})
    .limit(Number(pageSize))
    .skip((Number(page) - 1) * Number(pageSize))
    .sort("createdAt");

  const hiddinTweets = await HiddenTweets.find({});

  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i]._id);
    for (var j = 0; j < hiddinTweets.length; j++) {
      if (String(tweets[i]._id) === String(hiddinTweets[j].tweetId)) {
        tweets.splice(i, 1);

        i--;
        break;
      }
    }
  }

  res.status(StatusCodes.OK).json({ tweets });
};

const CreateTweet = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const tweet = await Tweet.create(req.body);
  res.status(StatusCodes.CREATED).json({ tweet });
};
const getTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req;

  const tweet = await Tweet.findOne({
    _id: tweetId,
    //createdBy: userId,
  });

  if (!tweet) {
    throw new NotFoundError(`no tweet with id ${tweetId}`);
  }

  res.status(StatusCodes.OK).json({ tweet });
};
const deleteTweet = async (req, res) => {
  const {
    user: { userId },
    params: { id: tweetId },
  } = req;

  const id = await Tweet.findOne({ _id: tweetId });
  if (id.createdBy != userId) {
    throw new BadRequestError("a user can only delete tweets that he created");
  }

  const tweet = await Tweet.findByIdAndRemove({
    _id: tweetId,
    createdBy: userId,
  });

  if (!tweet) {
    throw new NotFoundError(`no tweet with id ${tweetId}`);
  }

  res.status(StatusCodes.OK).send();
};
const updateTweet = async (req, res) => {
  const {
    body: { Description, Hashtag },
    params: { id: tweetId },
  } = req;

  const id = await Tweet.findOne({ _id: tweetId });
  const userId = req.user.userId;
  if (id.createdBy != userId) {
    throw new BadRequestError("a user can only update tweets that he created");
  }

  if (!Description || !Hashtag) {
    throw new BadRequestError("Description or Hashtag fields cant be empty");
  }
  const tweet = await Tweet.findByIdAndUpdate(
    { createdBy: userId, _id: tweetId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!tweet) {
    throw new NotFoundError(`no tweet with id ${tweetId}`);
  }

  res.status(StatusCodes.OK).json({ tweet });
};

const RetrieveSpecificUserTweets = async (req, res) => {
  const userId = req.params.userid;

  const tweets = await Tweet.find({ createdBy: userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ tweets });
};

module.exports = {
  CreateTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  RetrieveSpecificUserTweets,
};
