const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart_controller");
const { auth } = require("../middleware/auth");

router.post("/api/users/add-to-cart", auth, cartController.addToCart);

router.get("/api/users/remove-from-cart", auth, cartController.removeFromCart);

module.exports = router;
