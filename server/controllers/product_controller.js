const { Product } = require("../models/product");
const { Dress } = require("../models/dress");
const { Color } = require("../models/color");
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
    const product = await Product.findOne({ _id: req.query.id })
      .populate("color")
      .populate("dress");

    if (!product) {
      return res.status(404).json({ error: "No item was found!" });
    } else {
      res.status(200).json(product);
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
      .populate("dress")
      .populate("color")
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

productController.deleteArticle = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.query.id });
    return res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

productController.updateProduct = async (req, res) => {
  try {
    // const body = await _.pick(req.body, ["name", "lastname", "email"]);

    const product = await Product.findOne({ _id: req.query.id });
    const body = req.body;

    // await Product.findOne({ _id: req.query.id }, (err, doc) => {
    //   Product.findOneAndUpdate(
    //     { _id: req.query.id },
    //     {
    //       $set: {
    //         name: req.body.name,
    //         description: req.body.description,
    //         price: req.body.price,
    //         category: req.body.category,
    //         dress: req.body.dress,
    //         color: req.body.color,
    //         shipping: req.body.shipping,
    //         available: req.body.available,
    //         publish: req.body.publish,
    //         images: req.body.images
    //       }
    //     },
    //     { new: true },
    //     (err, doc) => {
    //       if (err) return res.json(err);
    //       res.status(200).json(doc);
    //     }
    //   );
    // });

    if (!product) {
      return res.json({
        message: "Sorry, something went wrong."
      });
    } else {
      product.name = body.name;
      product.description = body.description;
      product.price = body.price;
      product.category = body.category;
      product.dress = body.dress;
      product.color = body.color;
      product.shipping = body.shipping;
      product.available = body.available;
      product.publish = body.publish;
      product.images = body.images;

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

module.exports = productController;
