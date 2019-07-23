const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { validateBody } = require("../joi_schemas/user");
const { validateUserData } = require("../joi_schemas/register");
const { validateAddress } = require("../joi_schemas/postalAdress");
const passport = require("passport");

router.get(
  "/user/dashboard",
  // passport.authenticate("jwt", { session: false }),
  userController.getUserProfile
);

router.get("/all/users", userController.allProfiles);
router
  .route("/user/postal_address")
  .post(validateAddress("postalAddress"), userController.postalAddress);

router
  .route("/user/reset_user")
  .post(validateBody("requestReset"), userController.requestReset);

router
  .route("/user/reset_password")
  .post(validateBody("resetUserPassword"), userController.resetUserPassword);

router
  .route("/user/profile")
  .post(
    validateUserData("updateProfile"),
    passport.authenticate("jwt", { session: false }),
    userController.updateProfile
  );

router
  .route("/user/profile")
  .delete(
    passport.authenticate("jwt", { session: false }),
    userController.deleteProfile
  );

module.exports = router;
