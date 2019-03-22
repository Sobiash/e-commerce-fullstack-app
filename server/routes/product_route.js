const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { validateBody } = require("../joi_schemas/product");

router
  .route("/api/product/article")
  .post(
    validateBody("postArticle"),
    auth,
    admin,
    productController.postArticle
  );

router.get("/api/product/articles_by_id", productController.getArticles);

router.get("/api/product/articles", productController.filterItems);

// router.get("/api/products/categories", productController.listCategories);

module.exports = router;
