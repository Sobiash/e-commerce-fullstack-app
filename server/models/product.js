const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
      maxlength: 100
    },
    category: {
      type: String,
      required: true,
      maxlength: 100
    },
    description: {
      type: String,
      required: true,
      maxlength: 10000000
    },
    price: {
      type: Number,
      required: true,
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
      type: Boolean,
      required: true
    },
    available: {
      type: Boolean,
      required: true
    },
    sold: {
      type: Number,
      maxlength: 100,
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
