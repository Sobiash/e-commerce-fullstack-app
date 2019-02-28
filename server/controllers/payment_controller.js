const { Payment } = require("../models/payment");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const async = require("async");

const paymentController = {};

paymentController.successBuy = (req, res) => {
  let history = [];
  let transactionData = {};
  req.body.cartDetail.forEach(item => {
    history.push({
      dateOfPurchase: Date.now(),
      name: item.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.id
    });
  });

  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    lastname: req.user.lastname,
    email: req.user.email,
    cart: req.user.cart
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  User.findByIdAndUpdate(
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
};

module.exports = paymentController;
