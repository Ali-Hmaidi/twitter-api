const express = require("express");
const router = express.Router();

const { CreateTweet } = require("../controllers/tweets");

router.route("/").post(CreateTweet);

module.exports = router;
