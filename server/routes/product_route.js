const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");

const { admin } = require("../middleware/admin");
const { validateBody } = require("../joi_schemas/product");
const passport = require("passport");

router
  .route("/api/product/article")
  .post(
    validateBody("postArticle"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.postArticle
  );

router.get("/api/product/articles_by_id", productController.getArticleDetail);

router.get("/api/product/articles", productController.filterItems);

module.exports = router;
