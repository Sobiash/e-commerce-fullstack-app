const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const passport = require("passport");

router
  .route("/api/users/add-to-cart/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.addToCart
  );
router
  .route("/api/users/create-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.createCart
  );

router
  .route("/api/users/increase/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.increaseItem
  );
router
  .route("/api/users/decrease/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.decreaseItem
  );
router
  .route("/api/users/remove-item/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.removeFromCart
  );
router
  .route("/api/users/get-cart")
  .get(
    passport.authenticate("jwt", { session: false }),
    cartController.getCartDetail
  );

module.exports = router;
