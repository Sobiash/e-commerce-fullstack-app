const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
  quantity: {
    type: Number,
    default: 1
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

module.exports = { CartItem };
