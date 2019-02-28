const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop_controller");

router.post("/api/product/shop", shopController.shopItems);

module.exports = router;
