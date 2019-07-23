const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
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
        discountedPrice: {
          type: Number,
          default: 0
        },
        selectedSize: {
          type: String
        },
        selectedColor: {
          type: String
        }
      }
    ],
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
    postalAddress: {
      type: Schema.Types.ObjectId,
      ref: "PostalAddress"
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order };
