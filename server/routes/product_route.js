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

router.get(
  "/api/product/articles_by_id/:id",
  productController.getArticleDetail
);

router.get("/api/product/filter_items", productController.filterItems);

// router.get(
//   "/api/product/get_categories/:category",
//   productController.genderCategory
// );

// router.get("/api/product/get_dresses/:dress", productController.dressCategory);

router.get("/api/product/dresses", productController.getDresses);

router.get("/api/product/categories/:category", productController.categoryName);
router.get("/api/product/dresses/:dress", productController.dressName);

router.get("/api/product/colors", productController.getColors);

router.get("/api/product/categories", productController.getCategories);

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
  .route("/api/product/category")
  .post(
    validateBody("addCategory"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.addCategory
  );

router
  .route("/api/product/articles_by_id/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.deleteArticle
  );

module.exports = router;
