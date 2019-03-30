const { Payment } = require("../models/payment");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const async = require("async");
const SHA1 = require("crypto-js/sha1");
const { sendEmail } = require("../utils/mail/mail");
const { logger } = require("../utils/logger");

const paymentController = {};

paymentController.successBuy = async (req, res) => {
  try {
    let history = [];
    let transactionData = {};
    const date = new Date();
    const purchaseOrder = `PO-${date.getSeconds()}${date.getMilliseconds()}-${SHA1(
      req.user._id
    )
      .toString()
      .substring(0, 8)}`;

    req.body.cartDetail.forEach(item => {
      history.push({
        dateOfPurchase: Date.now(),
        name: item.name,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.id,
        purchaseOrder
      });
    });

    transactionData.user = {
      id: req.user._id,
      name: req.user.name,
      lastname: req.user.lastname,
      email: req.user.email,
      cart: req.user.cart
    };

    transactionData.data = { ...req.body.paymentData, purchaseOrder };
    transactionData.product = history;

    await User.findByIdAndUpdate(
      {
        _id: req.user._id
      },
      {
        $push: { history: history },
        $set: { cart: [] }
      },
      {
        new: true
      },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        const payment = new Payment(transactionData);
        payment.save((err, doc) => {
          if (err) return res.json({ success: false, err });
          let products = [];
          doc.product.forEach(item => {
            products.push({ id: item.id, quantity: item.quantity });
          });

          async.eachSeries(
            products,
            (item, callback) => {
              Product.update(
                {
                  _id: item.id
                },
                {
                  $inc: {
                    sold: item.quantity
                  }
                },
                {
                  new: false
                },
                callback
              );
            },
            err => {
              if (err) return res.json({ success: false, err });
              sendEmail(
                user.email,
                user.name,
                null,
                "purchase",
                transactionData
              );
              res.status(200).json({
                success: true,
                cart: user.cart,
                cartDetail: []
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
