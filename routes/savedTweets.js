const express = require("express");
const router = express.Router();

const {
  addTweet,
  deleteTweet,
  getAllTweets,
} = require("../controllers/savedTweets");

router.route("/").post(addTweet).get(getAllTweets);
router.route("/:id").delete(deleteTweet);

module.exports = router;
