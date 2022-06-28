const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/apiError");

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;
  resolve();
};

const studentAuth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwtForStudent",
      { session: false },
      verifyCallback(req, resolve, next)
    )(req, res, next);
  })
    .then(() => {
      next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = studentAuth;
