const { Product } = require("../models/product");
const { logger } = require("../utils/logger");
const _ = require("lodash");

const productController = {};

productController.postArticles = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "description",
      "price",
      "discount",
      "shipping",
      "available",
      "publish",
      "images",
      "category",
      "color",
      "size",
      "dress",
      "tags",
      "sale"
    ]);

    if (typeof body.color !== undefined) {
      body.color = body.color.split(",").map(i => i.trim());
    }
    if (typeof body.size !== undefined) {
      body.size = body.size.split(",").map(i => i.trim());
    }
    if (typeof body.category !== undefined) {
      body.category = body.category.split(",").map(i => i.trim());
    }
    if (typeof body.dress !== undefined) {
      body.dress = body.dress.split(",").map(i => i.trim());
    }
    if (body.tags) {
      body.tags = body.tags.split(",").map(i => i.trim());
    }

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
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.status(200).send(product);
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

productController.relatedArticles = async (req, res) => {
  try {
    const related = await Product.find({
      _id: { $ne: req.params.id },
      category: req.query.category
    })
      .limit(5)
      .exec();

    if (related) {
      res.status(200).send(related);
    } else {
      return res.status(400).json({
        error: "Could not find any product!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any product!" });
  }
};

productController.filterItems = async (req, res) => {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    const articles = await Product.find()
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    if (articles) {
      res.status(200).send(articles);
    } else {
      return res.status(400).send({
        error: "Could not find any product!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any product!" });
  }
};

productController.getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category", {});
    if (categories) {
      res.status(200).send(categories);
    } else {
      return res.status(400).send({
        error: "Could not find any category!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any category!" });
  }
};

productController.getDresses = async (req, res) => {
  try {
    const dresses = await Product.distinct("dress", {});
    if (dresses) {
      res.status(200).send(dresses);
    } else {
      return res.status(400).send({
        error: "Could not find any dress!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any dress!" });
  }
};

productController.getColors = async (req, res) => {
  try {
    const colors = await Product.distinct("color", {});
    if (colors) {
      res.status(200).send(colors);
    } else {
      return res.status(400).send({
        error: "Could not find any color!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any color!" });
  }
};

productController.getSizes = async (req, res) => {
  try {
    const sizes = await Product.distinct("size", {});
    if (sizes) {
      res.status(200).send(sizes);
    } else {
      return res.status(400).send({
        error: "Could not find any size!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any size!" });
  }
};

productController.searchArticles = async (req, res) => {
  try {
    const query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }

    const products = await Product.find(query);

    if (products) {
      res.status(200).send(products);
    } else {
      return res.status(400).send({
        error: "Could not find any product!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error: "Could not find any product!" });
  }
};

productController.updateProduct = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "description",
      "price",
      "discount",
      "shipping",
      "available",
      "publish",
      "images",
      "category",
      "color",
      "size",
      "dress",
      "tags",
      "sale"
    ]);

    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.json({
        message: "Sorry, something went wrong."
      });
    } else {
      product.name = body.name;
      product.description = body.description;
      product.price = body.price;
      product.discount = body.discount;
      product.shipping = body.shipping;
      product.available = body.available;
      product.publish = body.publish;
      product.images = body.images;
      product.category = body.category;
      product.color = body.color;
      product.size = body.size;
      product.dress = body.dress;
      product.tags = body.tags;
      product.sale = body.sale;
      product.updatedAt = Date.now();

      product.save((err, doc) => {
        if (err) return res.status(400).json({ err });
        return res.status(200).json({
          success: true
        });
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
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
