const express = require("express");
const authController = require("../../controllers/auth.controller");
const adminAuth = require("../../middlewares/adminAuth");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.login);

router.post("/addStudent", adminAuth(), authController.addStudent);

router.put("/students/:id", adminAuth(), authController.updateStudent);

module.exports = router;
