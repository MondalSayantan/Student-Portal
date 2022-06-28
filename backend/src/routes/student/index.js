const express = require("express");
const authController = require("../../controllers/auth.controller");
const studentAuth = require("../../middlewares/studentAuth");

const router = express.Router();

router.post("/login", authController.login);

router.get("/me", studentAuth(), authController.me);

router.put("/update", studentAuth(), authController.updateByStudent);

module.exports = router;
