const { Cart } = require("../models/cart");
const mongoose = require("mongoose");
const _ = require("lodash");
const { logger } = require("../utils/logger");
const cartController = {};

cartController.createCart = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["user"]);
    const exists = await Cart.findOne({ user: body.user });
    if (exists) {
      res.json(exists);
      return;
    } else {
      const { user } = body;
      const cart = await new Cart(body);
      await cart.save();
      res.json(cart);
    }
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
        if (
          item.product == req.params.id &&
          item.selectedSize === req.body.selectedSize &&
          item.selectedColor === req.body.selectedColor
        ) {
          duplicate = true;
        }
      });

      if (duplicate) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItem.product": mongoose.Types.ObjectId(req.params.id),
            "cartItem.selectedSize": req.body.selectedSize,
            "cartItem.selectedColor": req.body.selectedColor
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
                images: req.body.images,
                selectedSize: req.body.selectedSize,
                selectedColor: req.body.selectedColor
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
    await Cart.findOne({ user: req.user._id }, (err, doc) => {
      doc.cartItem.forEach(item => {
        if (
          item.product == req.body.id &&
          item.selectedSize === req.body.size &&
          item.selectedColor === req.body.color
        ) {
          Cart.findOneAndUpdate(
            {
              user: req.user._id,
              "cartItem.product": mongoose.Types.ObjectId(req.body.id),
              "cartItem.selectedSize": req.body.size,
              "cartItem.selectedColor": req.body.color
            },
            {
              $pull: {
                cartItem: {
                  product: req.body.id,
                  selectedSize: req.body.size,
                  selectedColor: req.body.color
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
      });
    });
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
        if (
          item.product == req.body.id &&
          item.selectedSize === req.body.size &&
          item.selectedColor === req.body.color
        ) {
          duplicate = true;
        }
      });

      if (duplicate) {
        Cart.findOneAndUpdate(
          {
            user: req.user._id,
            "cartItem.product": mongoose.Types.ObjectId(req.body.id),
            "cartItem.selectedSize": req.body.size,
            "cartItem.selectedColor": req.body.color
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
      doc.cartItem.forEach(item => {
        if (
          item.product == req.body.id &&
          item.selectedSize === req.body.size &&
          item.selectedColor === req.body.color
        ) {
          if (item.quantity > 0) {
            Cart.findOneAndUpdate(
              {
                user: req.user._id,
                "cartItem.product": mongoose.Types.ObjectId(req.body.id),
                "cartItem.selectedSize": req.body.size,
                "cartItem.selectedColor": req.body.color
              },
              { $inc: { "cartItem.$.quantity": -1 } },
              { new: true },
              () => {
                if (err) return res.json({ success: false, err });
                res.status(200).json(doc.cartItem);
              }
            );
          }
        }
      });
    });
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

module.exports = cartController;
