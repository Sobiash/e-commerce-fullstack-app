const { Product } = require("../models/product");
const mongoose = require("mongoose");
const _ = require("lodash");

const productController = {};

productController.postArticle = async (req, res) => {
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

  if (typeof req.body.color !== undefined) {
    body.color = req.body.color.split(",");
  }

  const product = await new Product(body);
  product.save((err, product) => {
    if (err) return res.json(err);
    res.status(200).json({
      article: product
    });
  });
};

productController.getArticles = async (req, res) => {
  const productDetail = await Product.findOne({ _id: req.query.id });
  if (productDetail) {
    return res.status(200).send(productDetail);
  } else {
    return res.status(422).send({
      error: `Could not find any item matching with ${req.query.id}!`
    });
  }
};

//get products
// by arrival
// /api/product/articles?sortBy=createdAt&order=desc&limit=4
// by sold
// /api/product/articles?sortBy=sold&order=desc&limit=10

productController.filterItems = async (req, res) => {
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
};

module.exports = productController;
