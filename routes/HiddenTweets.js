const express = require("express");
const router = express.Router();

const { hideTweet, unhideTweet } = require("../controllers/HiddenTweets");

router.route("/hide").post(hideTweet);
router.route("/unhide").post(unhideTweet);

module.exports = router;
