const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const passport = require("passport");

router
  .route("/add-to-cart/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.addToCart
  );
router
  .route("/create-cart")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.createCart
  );

router
  .route("/increase/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.increaseItem
  );
router
  .route("/decrease/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.decreaseItem
  );
router
  .route("/remove-item/:id")
  .post(
    passport.authenticate("jwt", { session: false }),
    cartController.removeFromCart
  );
router
  .route("/get-cart")
  .get(
    passport.authenticate("jwt", { session: false }),
    cartController.getCartDetail
  );

module.exports = router;
