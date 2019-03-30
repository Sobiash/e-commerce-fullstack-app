const express = require("express");
const router = express.Router();
const registerLoginController = require("../controllers/registerLogin_controller");
const { auth } = require("../middleware/auth");
const { validateRegistration } = require("../joi_schemas/register");
const { validateLogin } = require("../joi_schemas/login");
const passport = require("passport");

router
  .route("/api/users/register")
  .post(
    validateRegistration("registerUser"),
    registerLoginController.registerUser
  );

router.get("/api/users/auth", auth, registerLoginController.authUser);

router
  .route("/api/users/login")
  .post(validateLogin("loginUser"), registerLoginController.loginUser);

router.get("/api/users/logout", auth, registerLoginController.logoutUser);

module.exports = router;
