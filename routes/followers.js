const express = require("express");
const router = express.Router();

const {
  addFollower,
  deleteFollower,
  getFollowedUsersTweets,
} = require("../controllers/followers");

router.route("/").post(addFollower).get(getFollowedUsersTweets);
router.route("/:id").delete(deleteFollower);

module.exports = router;
