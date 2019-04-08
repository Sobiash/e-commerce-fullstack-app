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

router.get("/api/product/dresses", productController.getDresses);

router.get("/api/product/colors", productController.getColors);

router
  .route("/api/product/dress")
  .post(
    validateBody("addDress"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.addDress
  );
router
  .route("/api/product/color")
  .post(
    validateBody("addColor"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.addColor
  );

router
  .route("/api/product/articles_by_id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.deleteArticle
  );

router
  .route("/api/product/update-product")
  .post(
    validateBody("updateProduct"),
    passport.authenticate("jwt", { session: false }),
    productController.updateProduct
  );

module.exports = router;
