const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/users");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser);
router.route("/changepassword/:id").patch(changePassword);

module.exports = router;
