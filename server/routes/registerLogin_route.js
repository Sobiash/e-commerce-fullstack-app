const express = require("express");
const router = express.Router();
const registerLoginController = require("../controllers/registerLogin_controller");
const { auth } = require("../middleware/auth");

router.get("/api/users/auth", auth, registerLoginController.authUser);

router.post("/api/users/register", registerLoginController.registerUser);

router.post("/api/users/login", registerLoginController.loginUser);

router.get("/api/users/logout", auth, registerLoginController.logoutUser);

module.exports = router;
