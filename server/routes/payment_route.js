const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");
const { auth } = require("../middleware/auth");

router.post("/api/users/success-buy", auth, paymentController.successBuy);

module.exports = router;
