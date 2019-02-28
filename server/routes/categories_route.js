const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.post("/api/product/color", auth, admin, categoriesController.postColor);

router.get("/api/product/colors", categoriesController.getColors);

router.post("/api/product/dress", auth, admin, categoriesController.postDress);

router.get("/api/product/dresses", categoriesController.getDresses);

module.exports = router;
