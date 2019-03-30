const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { validateBody } = require("../joi_schemas/user");
const { validateUserData } = require("../joi_schemas/register");
const passport = require("passport");

router
  .route("/api/users/reset-user")
  .post(validateBody("resetUser"), userController.resetUser);

router
  .route("/api/users/reset-password")
  .post(validateBody("resetUserPassword"), userController.resetUserPassword);

router
  .route("/api/users/update-profile")
  .post(
    validateUserData("updateProfile"),
    passport.authenticate("jwt", { session: false }),
    userController.updateProfile
  );

router
  .route("/api/users/login")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userController.deleteProfile
  );

module.exports = router;
