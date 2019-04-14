const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");
const { validateUserData } = require("../joi_schemas/register");
const { validateLogin } = require("../joi_schemas/login");

router
  .route("/api/users/register")
  .post(validateUserData("registerUser"), authController.registerUser);

router
  .route("/api/users/login")
  .post(validateLogin("loginUser"), authController.loginUser);

module.exports = router;
