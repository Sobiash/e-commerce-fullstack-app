const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { validateUserData } = require("../joi_schemas/register");
const { validateLogin } = require("../joi_schemas/login");

router
  .route("/register")
  .post(validateUserData("registerUser"), authController.registerUser);

router
  .route("/login")
  .post(validateLogin("loginUser"), authController.loginUser);

module.exports = router;
