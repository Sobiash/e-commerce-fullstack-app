const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  description: {
    required: true,
    type: String,
    maxlength: 10000000
  },
  images: {
    type: Array,
    default: []
  },
  price: {
    required: true,
    type: Number,
    maxlength: 255
  },
  quantity: {
    type: Number,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = { OrderItem };
