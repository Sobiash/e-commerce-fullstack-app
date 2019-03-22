const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { validateBody } = require("../joi_schemas/categories");

router
  .route("/api/product/color")
  .post(validateBody("postColor"), auth, admin, categoriesController.postColor);

router.get("/api/product/colors", categoriesController.getColors);

router
  .route("/api/product/dress")
  .post(validateBody("postDress"), auth, admin, categoriesController.postDress);

router.get("/api/product/dresses", categoriesController.getDresses);

module.exports = router;
