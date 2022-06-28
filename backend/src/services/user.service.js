const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createUser = async function (userBody) {
  const user = await User.create(userBody);
  return user;
};

const loginUser = async function (id, password) {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if ((await user.comparePassword(password)) === false) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Wrong password");
  }
  console.log("hello");
  return user;
};

const updateUser = async function (id, userBody) {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  const updatedUser = await user.updateOne(userBody);
  return updatedUser;
};

module.exports = { createUser, loginUser, updateUser };
