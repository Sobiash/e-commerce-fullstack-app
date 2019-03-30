const { Product } = require("../models/product");
const { logger } = require("../utils/logger");

const shopController = {};

shopController.shopItems = async (req, res) => {
  try {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === "price") {
          findArgs[key] = {
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1]
          };
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    findArgs["publish"] = true;

    await Product.find(findArgs)
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, articles) => {
        if (err)
          return res.status(400).send({ error: "No shop items are found!" });
        res.status(200).json({
          size: articles.length,
          articles: articles
        });
      });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = shopController;
