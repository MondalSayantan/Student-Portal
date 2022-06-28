const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { tokenTypes } = require("./tokens");
const { User } = require("../models");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerifyForAdmin = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid Token Type");
    }
    const id = payload.sub;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return done(null, false);
    }
    if (payload.role !== "Admin") {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtVerifyForStudent = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid Token Type");
    }
    const id = payload.sub;
    const user = await User.findOne({ _id: id });
    if (!user || !user.role == "Student") {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategyForAdmin = new JwtStrategy(jwtOptions, jwtVerifyForAdmin);
const jwtStrategyForStudent = new JwtStrategy(jwtOptions, jwtVerifyForStudent);

module.exports = {
  jwtStrategyForAdmin,
  jwtStrategyForStudent,
};
