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
    productController.postArticle
  );

router.get("/articles_by_id/:id", productController.getArticleDetail);

router.get("/filter_items", productController.getItems);

router.get("/dresses", productController.getDresses);

router.get("/categories/:category", productController.categoryName);
router.get("/dresses/:dress", productController.dressName);

router.get("/categories", productController.getCategories);

router
  .route("/dress")
  .post(
    validateBody("addDress"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.addDress
  );

router
  .route("/category")
  .post(
    validateBody("addCategory"),
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.addCategory
  );

router
  .route("/articles_by_id/:id")
  .delete(
    passport.authenticate("jwt", { session: false }),
    admin,
    productController.deleteArticle
  );

module.exports = router;
