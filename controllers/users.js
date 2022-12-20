const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res) => {
  const user = await User.find({});
  res.status(StatusCodes.OK).json({ user });
};

const getUser = async (req, res) => {
  const {
    user: { logedinUserId },
    params: { id: userId },
  } = req;

  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    throw new NotFoundError(`no user with id ${userId}`);
  }

  newUser = {
    _id: userId,
    name: user.name,
    username: user.username,
    birthday: user.birthday,
    address: user.address,
  };

  res.status(StatusCodes.OK).json({ newUser });
};

const updateUser = async (req, res) => {
  const {
    body: { name, username, birthday, address },
    params: { id: userId },
  } = req;

  const id = await User.findOne({ _id: userId });
  const logeduserId = req.user.userId;
  if (id._id != logeduserId) {
    throw new BadRequestError("a user can only update  his info");
  }

  if (!name || !username || !birthday || !address) {
    throw new BadRequestError("fields cant be empty");
  }
  const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError(`no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).json({
    _id: user._id,
    name: user.name,
    username: user.username,
    birthday: user.birthday,
    address: user.address,
  });
};
const changePassword = async (req, res) => {
  const {
    body: { password },
    params: { id: userId },
  } = req;

  const logeduserId = req.user.userId;
  if (userId != logeduserId) {
    throw new BadRequestError("a user can only change  his password");
  }

  if (!password) {
    throw new BadRequestError("fields cant be empty");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { password: hashedpassword }
  );

  if (!user) {
    throw new NotFoundError(`no user with id ${userId}`);
  }

  res.status(StatusCodes.OK).send();
};

module.exports = { getAllUsers, getUser, updateUser, changePassword };
