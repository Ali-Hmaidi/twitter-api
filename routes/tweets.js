const express = require("express");
const router = express.Router();

const {
  CreateTweet,
  getAllTweets,
  getTweet,
  deleteTweet,
  updateTweet,
  RetrieveSpecificUserTweets,
} = require("../controllers/tweets");

router.route("/").post(CreateTweet).get(getAllTweets);
router.route("/:id").get(getTweet).delete(deleteTweet).patch(updateTweet);
router.route("/userTweets/:userid").get(RetrieveSpecificUserTweets);

module.exports = router;
