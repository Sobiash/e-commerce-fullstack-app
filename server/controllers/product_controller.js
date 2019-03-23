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
  const product = await new Product(body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
};

productController.getArticles = async (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }
  await Product.find({ _id: { $in: items } })
    .populate("dress")
    .populate("color")

    .exec((err, docs) => {
      if (err)
        return res.status(422).send({
          errors: [
            {
              detail: `Could not find any item matching with ${req.query.id}!`
            }
          ]
        });
      res.status(200).send(docs);
    });
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
    .populate("dress")
    .populate("color")

    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
};

module.exports = productController;
