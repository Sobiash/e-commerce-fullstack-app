const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
      unique: 1,
      maxlength: 100
    },
    category: {
      required: true,
      type: String,
      maxlength: 100
    },
    description: {
      required: true,
      type: String,
      maxlength: 10000000
    },
    price: {
      required: true,
      type: Number,
      maxlength: 255
    },
    dress: {
      type: Schema.Types.ObjectId,
      ref: "Dress",
      required: true
    },
    color: {
      type: Schema.Types.ObjectId,
      ref: "Color",
      required: true
    },
    shipping: {
      required: true,
      type: Boolean
    },
    available: {
      required: true,
      type: Boolean
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0
    },
    publish: {
      required: true,
      type: Boolean
    },
    images: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
