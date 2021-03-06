const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const formidable = require("express-formidable");
const passport = require("passport");
const { admin } = require("../middleware/admin");

router
  .route("/upload-image")
  .post(
    passport.authenticate("jwt", { session: false }),
    admin,
    formidable(),
    adminController.uploadImage
  );

router.get(
  "/remove-image",

  adminController.removeImage
);

module.exports = router;
