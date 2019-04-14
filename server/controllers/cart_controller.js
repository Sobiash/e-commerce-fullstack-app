const { User } = require("../models/user");
const { Product } = require("../models/product");
const { Cart } = require("../models/cartItem");
const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const cartController = {};

cartController.createCart = async (req, res) => {
  try {
    const { user } = req.body;
    const cart = await new Cart(req.body);
    cart.save(err => {
      if (err)
        return res.json({
          err
        });
    });
    res.json(cart);
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

cartController.addToCart = async (req, res) => {
  try {
    await Cart.findOne({ user: req.user._id }, (err, doc) => {
      let duplicate = false;

      doc.cartItem.forEach(item => {
        if (item.product == req.params.id) {
          duplicate = true;
        }
      });

      if (duplicate) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItem.product": mongoose.Types.ObjectId(req.params.id)
          },
          { $inc: { "cartItem.$.quantity": 1 } },
          { new: true },
          () => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc.cartItem);
          }
        );
      } else {
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItem: {
                product: mongoose.Types.ObjectId(req.params.id),
                quantity: 1,
                price: req.body.price,
                name: req.body.name,
                images: req.body.images
              }
            }
          },
          { new: true },
          (err, doc) => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc.cartItem);
          }
        );
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

cartController.getCartDetail = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      res.status(200).json(cart.cartItem);
    } else {
      return res.status(404).json({
        error: "Could not find any cart!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "Could not find any cart!" });
  }
};

cartController.removeFromCart = async (req, res) => {
  try {
    const user = Cart.findOne({ user: req.user._id });
    if (user) {
      Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: {
            cartItem: {
              product: mongoose.Types.ObjectId(req.params.id)
            }
          }
        },
        { new: true },
        (err, doc) => {
          if (err) return res.json(err);
          res.status(200).json(doc.cartItem);
        }
      );
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

cartController.increaseItem = async (req, res) => {
  try {
    await Cart.findOne({ user: req.user._id }, (err, doc) => {
      let duplicate = false;
      doc.cartItem.forEach(item => {
        if (item.product == req.params.id) {
          duplicate = true;
        }
      });

      if (duplicate) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItem.product": mongoose.Types.ObjectId(req.params.id)
          },
          { $inc: { "cartItem.$.quantity": 1 } },
          { new: true },
          () => {
            if (err) return res.json({ success: false, err });
            res.status(200).json(doc.cartItem);
          }
        );
      }
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};
cartController.decreaseItem = async (req, res) => {
  try {
    await Cart.findOne({ user: req.user._id }, (err, doc) => {
      Cart.findOneAndUpdate(
        {
          user: req.user._id,
          "cartItem.product": mongoose.Types.ObjectId(req.params.id)
        },
        { $inc: { "cartItem.$.quantity": -1 } },
        { new: true },
        () => {
          if (err) return res.json({ success: false, err });
          res.status(200).json(doc.cartItem);
        }
      );
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

module.exports = cartController;
