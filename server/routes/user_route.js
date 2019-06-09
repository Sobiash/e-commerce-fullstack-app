const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { validateBody } = require("../joi_schemas/user");
const { validateUserData } = require("../joi_schemas/register");
const passport = require("passport");

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  userController.getUserProfile
);

router
  .route("/reset-user")
  .post(validateBody("requestReset"), userController.requestReset);

router
  .route("/reset-password")
  .post(validateBody("resetUserPassword"), userController.resetUserPassword);

router
  .route("/update-profile")
  .post(
    validateUserData("updateProfile"),
    passport.authenticate("jwt", { session: false }),
    userController.updateProfile
  );

router
  .route("/")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userController.deleteProfile
  );

module.exports = router;
