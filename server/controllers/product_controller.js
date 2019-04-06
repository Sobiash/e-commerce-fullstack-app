const { Product } = require("../models/product");
const { Dress } = require("../models/dress");
const { Color } = require("../models/color");

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
      if (err) return res.status(404).json(err);
      res.status(200).json({
        article: product
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.getArticleDetail = async (req, res) => {
  try {
    const productDetail = await Product.findOne({ _id: req.query.id });
    if (productDetail) {
      return res.status(200).send(productDetail);
    } else {
      return res.status(422).send({
        error: `Could not find any item matching with ${req.query.id}!`
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
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

    await Product.find()

      .sort([[sortBy, order]])
      .limit(limit)
      .exec((err, articles) => {
        if (err) return res.status(400).send(err);
        res.send(articles);
      });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.addDress = async (req, res) => {
  try {
    const dress = await new Dress(req.body);
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
      return res.status(422).send({
        error: "Could not find any dress!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.addColor = async (req, res) => {
  try {
    const color = await new Color(req.body);
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

module.exports = productController;
