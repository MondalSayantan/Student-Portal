const express = require("express");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const config = require("./config/config");
const studentRoutes = require("./routes/student");
const adminRoutes = require("./routes/admin");
const helmet = require("helmet");
const passport = require("passport");
const ApiError = require("./utils/ApiError");
const {
  jwtStrategyForAdmin,
  jwtStrategyForStudent,
} = require("./config/passport");

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use(passport.initialize());
passport.use("jwtForAdmin", jwtStrategyForAdmin);
passport.use("jwtForStudent", jwtStrategyForStudent);

app.use("/student", studentRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

module.exports = app;
