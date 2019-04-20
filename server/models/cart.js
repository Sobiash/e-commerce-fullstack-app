const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  cartItem: [
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

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
