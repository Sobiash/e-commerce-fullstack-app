const express = require("express");
const router = express.Router();
const productController = require("../controllers/product_controller");
const { admin } = require("../middleware/admin");
const { validateBody } = require("../joi_schemas/product");
const passport = require("passport");

router
  .route("/article")
  .post(
    validateBody("postArticle"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.postArticles
  );

router.get("/product_detail/:id", productController.getArticleDetail);

router.get("/filter_items", productController.filterItems);

router.get("/dresses", productController.getDresses);
router.get("/tags", productController.getTags);

router.get("/categories", productController.getCategories);
router.get("/colors", productController.getColors);
router.get("/sizes", productController.getSizes);

router.get("/search", productController.searchArticles);

router.get("/related/:id", productController.relatedArticles);

router
  .route("/product/:id")
  .put(
    validateBody("updateProduct"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.updateProduct
  );

router
  .route("/product/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.deleteArticle
  );

module.exports = router;
