const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");

const generateToken = (
  userId,
  role,
  expires,
  type,
  secret = config.jwt.secret
) => {
  const payload = {
    sub: userId,
    role: role,
    type: type,
    exp: expires,
  };
  return jwt.sign(payload, secret);
};

const generateAuthToken = async (user) => {
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60; // in seconds
  const accessToken = generateToken(
    user._id,
    user.role,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  return {
    access: {
      token: accessToken,
      role: user.role,
      expires: new Date(accessTokenExpires * 1000), // convert to milliseconds
    },
  };
};

module.exports = {
  generateAuthToken,
  generateToken,
};
