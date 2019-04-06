const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const passport = require("passport");

router
  .route("/api/users/add-to-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.addToCart
  );

router
  .route("/api/users/remove-from-cart")
  .get(
    passport.authenticate("jwt", { session: false }),
    cartController.removeFromCart
  );

module.exports = router;
