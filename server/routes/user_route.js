const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { auth } = require("../middleware/auth");
const { validateBody } = require("../joi_schemas/user");

router
  .route("/api/users/reset-user")
  .post(validateBody("resetUser"), userController.resetUser);

router
  .route("/api/users/reset-password")
  .post(validateBody("resetUserPassword"), userController.resetUserPassword);

router
  .route("/api/users/update-profile")
  .post(validateBody("updateProfile"), auth, userController.updateProfile);

module.exports = router;
