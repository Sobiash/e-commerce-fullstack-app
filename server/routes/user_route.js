const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const { auth } = require("../middleware/auth");

router.post("/api/users/reset-user", auth, userController.resetUserPassword);

router.post("/api/users/update-profile", auth, userController.updateProfile);

module.exports = router;
