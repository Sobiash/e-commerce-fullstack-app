const { Product } = require("../models/product");
const { Dress } = require("../models/dress");
const { Color } = require("../models/color");
const { Category } = require("../models/category");
const { logger } = require("../utils/logger");

const _ = require("lodash");

const productController = {};

productController.postArticle = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "description",
      "price",
      "shipping",
      "available",
      "publish",
      "images",
      "category",
      "color",
      "dress"
    ]);

    const product = await new Product(body);
    product.save((err, product) => {
      if (err) return res.status(404).json(err.message);
      res.status(200).json({
        article: product
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: error.message });
  }
};

productController.getArticleDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("color")
      .populate("dress")
      .populate("category");
    if (product) {
      res.status(200).send(product);
    } else {
      return res.status(404).json({
        error: "Could not find any product!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any product!" });
  }
};

productController.genderCategory = async (req, res) => {
  try {
    const items = await Product.find({ category: req.params.category })
      .populate("dress")
      .populate("color")
      .populate("category")
      .exec();
    if (items) {
      res.status(200).send(items);
    } else {
      return res.status(404).send({
        error: "Could not find any item!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any item!" });
  }
};

//get products
// by arrival
// /api/product/articles?sortBy=createdAt&order=desc&limit=4
// by sold
// /api/product/articles?sortBy=sold&order=desc&limit=10

productController.filterItems = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const articles = await Product.find()
      .populate("dress")
      .populate("color")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    if (articles) {
      res.status(200).send(articles);
    } else {
      return res.status(404).send({
        error: "Could not find any product!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any product!" });
  }
};

productController.addDress = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["name"]);
    const dress = await new Dress(body);
    dress.save(err => {
      if (err)
        return res.json({
          err
        });
      res.status(200).json({
        dress
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.getDresses = async (req, res) => {
  try {
    const dresses = await Dress.find({});
    if (dresses) {
      res.status(200).send(dresses);
    } else {
      return res.status(404).send({
        error: "Could not find any dress!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any dress!" });
  }
};

productController.addColor = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["name"]);
    const color = await new Color(body);
    color.save(err => {
      if (err)
        return res.json({
          err
        });
      res.status(200).json({
        color
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.getColors = async (req, res) => {
  try {
    const colors = await Color.find({});
    if (colors) {
      res.status(200).send(colors);
    } else {
      return res.status(422).send({
        error: "Could not find any color!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.addCategory = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["name"]);
    const category = await new Category(body);
    category.save(err => {
      if (err)
        return res.json({
          err
        });
      res.status(200).json({
        category
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (categories) {
      res.status(200).send(categories);
    } else {
      return res.status(404).send({
        error: "Could not find any category!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any dress!" });
  }
};

productController.deleteArticle = async (req, res) => {
  try {
    const article = await Product.findById(req.params.id);
    if (article) {
      await article.remove();
      res.json({ success: true });
    } else {
      return res.status(404).json({ error: "Could not find any product!" });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any product!" });
  }
};

module.exports = productController;
