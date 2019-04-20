const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  total: {
    type: Number,
    default: 0
  },
  charge: {
    type: String
  },
  purchaseOrder: {
    type: String
  },
  orderItem: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number,
        default: 1
      },
      name: {
        type: String
      },
      images: {
        type: Array,
        default: []
      },
      price: {
        type: Number
      }
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
