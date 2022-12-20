const express = require("express");
const router = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/comments");

router.route("/:id").post(addComment).get(getComments).delete(deleteComment);

module.exports = router;
