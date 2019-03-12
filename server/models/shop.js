const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    images: {
      type: Array,
      default: []
    },
    description: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);
const Shop = mongoose.model("Shop", shopSchema);

module.exports = { Shop };
