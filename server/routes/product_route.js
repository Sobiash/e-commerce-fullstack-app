const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.post("/api/product/article", auth, admin, productController.postArticle);

router.get("/api/product/articles_by_id", productController.getArticles);

router.get("/api/product/articles", productController.filterItems);

module.exports = router;