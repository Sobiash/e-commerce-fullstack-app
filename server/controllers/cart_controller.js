const { User } = require("../models/user");
const { Product } = require("../models/product");
const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const cartController = {};

cartController.addToCart = async (req, res) => {
  try {
    await User.findOne({ _id: req.user._id }, (err, doc) => {
      let duplicate = false;
      doc.cart.forEach(item => {
        if (item.id === req.query.productId) {
          duplicate = true;
        }
      });

      if (duplicate) {
        User.findOneAndUpdate(
          {
            _id: req.user._id,
            "cart.id": mongoose.Types.ObjectId(req.query.productId)
          },
          { $inc: { "cart.$.quantity": 1 } },
          { new: true },
          () => {
            if (err) return res.json(err);
            res.status(200).json(doc.cart);
          }
        );
      } else {
        User.findOneAndUpdate(
          { _id: req.user._id },
          {
            $push: {
              cart: {
                id: mongoose.Types.ObjectId(req.query.productId),
                quantity: 1,
                date: Date.now()
              }
            }
          },
          { new: true },
          (err, doc) => {
            if (err) return res.json(err);
            res.status(200).json(doc.cart);
          }
        );
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

cartController.removeFromCart = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { cart: { id: mongoose.Types.ObjectId(req.query._id) } } },
      { new: true },
      (err, doc) => {
        let cart = doc.cart;
        let array = cart.map(item => {
          return mongoose.Types.ObjectId(item.id);
        });

        Product.find({ _id: { $in: array } }).exec((err, cartDetail) => {
          return res.status(200).json({
            cartDetail,
            cart
          });
        });
      }
    );
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = cartController;
