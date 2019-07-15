const { Order } = require("../models/order");
const { Cart } = require("../models/cart");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const async = require("async");
const SHA1 = require("crypto-js/sha1");
const { sendEmail } = require("../utils/mail/mail");
const { logger } = require("../utils/logger");
const stripe = require("../config/stripe");

const paymentController = {};

paymentController.successBuy = async (req, res) => {
  try {
    let history = [];
    let transactionData = {};
    let total = 0;
    const orderItem = [];
    const date = new Date();
    let formatted_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    const purchaseOrder = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
      req.user._id
    )
      .toString()
      .substring(0, 8)}`;

    req.body.cartDetail.forEach(item => {
      history.push({
        dateOfPurchase: formatted_date,
        product: item.product._id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        discountedPrice: item.discountedPrice
          ? item.discountedPrice * item.quantity
          : 0,
        purchaseOrder
      });
    });

    req.body.cartDetail.forEach(item => {
      total += parseInt(item.product.price, 10) * item.quantity;
      return total;
    });

    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "USD",
      source: req.body.paymentData.id
    });

    req.body.cartDetail.forEach(item => {
      orderItem.push({
        product: item.product._id,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        discountedPrice: item.discountedPrice
          ? item.discountedPrice * item.quantity
          : 0
      });
      return orderItem;
    });

    transactionData.user = req.user._id;
    transactionData.total = total;
    transactionData.paymentId = charge.id;
    transactionData.orderItem = orderItem;
    transactionData.purchaseOrder = purchaseOrder;

    User.updateOne(
      {
        _id: req.user._id
      },
      {
        $push: { history: history }
      },
      {
        new: true
      },
      (err, user) => {
        if (err) return res.json({ success: false, err });

        const order = new Order(transactionData);
        order.save((err, doc) => {
          if (err) return res.json({ success: false, err });

          async.eachSeries(
            doc.orderItem,
            (item, callback) => {
              Product.updateOne(
                {
                  _id: item.product._id
                },
                {
                  $inc: {
                    sold: item.quantity
                  }
                },
                {
                  new: true
                },
                callback
              );
            },
            err => {
              if (err) return res.json({ success: false, err });

              Cart.updateOne(
                { user: req.user._id },
                {
                  $set: {
                    cartItem: []
                  }
                },
                { new: true },
                (err, doc) => {
                  if (err) return res.json(err);
                  doc;
                }
              );

              sendEmail(
                user.email,
                user.name,
                null,
                "purchase",
                transactionData,
                purchaseOrder
              );
              res.status(200).json({
                success: true
              });
            }
          );
        });
      }
    );
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = paymentController;
