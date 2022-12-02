const Tweet = require("../models/Tweets");

const CreateTweet = async (req, res) => {
  try {
    const tweet = await Tweet.create(req.body);
    res.status(201).json({ tweet });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = { CreateTweet };
