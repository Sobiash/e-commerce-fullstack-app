const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const colorSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Color = mongoose.model("Color", colorSchema);

module.exports = { Color };
