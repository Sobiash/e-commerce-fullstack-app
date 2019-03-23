const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const formidable = require("express-formidable");

router.post(
  "/api/users/upload-image",
  auth,
  admin,
  formidable(),
  adminController.uploadImage
);

router.get("/api/users/remove-image", auth, admin, adminController.removeImage);

module.exports = router;
