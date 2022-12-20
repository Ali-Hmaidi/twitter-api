const express = require("express");
const router = express.Router();

const {
  getLikes,
  likeTweet,
  unlikeTweet,
  getLikesCount,
} = require("../controllers/likes");

router.route("/:id").get(getLikes).post(likeTweet).delete(unlikeTweet);
router.route("/likesCount/:id").get(getLikesCount);

module.exports = router;
