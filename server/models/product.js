const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      reqired: true,
      maxlength: 100,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10000
    },
    price: {
      type: Number,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    category: {
      type: [String],
      required: true
    },
    dress: {
      type: [String],
      required: true
    },
    color: {
      type: [String],
      required: true
    },
    size: {
      type: [String],
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    sale: {
      type: Boolean,
      default: false
    },
    shipping: {
      type: Number,
      default: 15
    },
    sold: {
      type: Number,
      maxlength: 250,
      default: 0
    },
    publish: {
      type: Boolean,
      default: true
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
