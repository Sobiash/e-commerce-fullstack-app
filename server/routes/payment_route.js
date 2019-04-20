const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment_controller");
const passport = require("passport");

router
  .route("/api/users/success-buy")
  .post(
    passport.authenticate("jwt", { session: false }),
    paymentController.successBuy
  );

module.exports = router;
