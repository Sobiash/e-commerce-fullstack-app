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
  ]
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
