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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
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
      type: Number
    },
    available: {
      type: Boolean,
      required: true
    },
    sold: {
      type: Number,
      maxlength: 250,
      default: 0
    },
    publish: {
      type: Boolean,
      required: true
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
