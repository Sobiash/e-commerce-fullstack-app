const express = require("express");
const router = express.Router();
const registerLoginController = require("../controllers/registerLogin_controller");
const { auth } = require("../middleware/auth");
const { validateBody } = require("../joi_schemas/user");
const passport = require("passport");

router
  .route("/api/users/register")
  .post(validateBody("registerUser"), registerLoginController.registerUser);

router.get("/api/users/auth", auth, registerLoginController.authUser);

router
  .route("/api/users/login")
  .post(validateBody("loginUser"), registerLoginController.loginUser);

router.get("/api/users/logout", auth, registerLoginController.logoutUser);

module.exports = router;
