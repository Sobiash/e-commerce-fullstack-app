const express = require("express");
const router = express.Router();
const registerLoginController = require("../controllers/registerLogin_controller");
const { validateUserData } = require("../joi_schemas/register");
const { validateLogin } = require("../joi_schemas/login");
const passport = require("passport");

router
  .route("/api/users/register")
  .post(validateUserData("registerUser"), registerLoginController.registerUser);

router
  .route("/api/users/login")
  .post(validateLogin("loginUser"), registerLoginController.loginUser);

module.exports = router;
