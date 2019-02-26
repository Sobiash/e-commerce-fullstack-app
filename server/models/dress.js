const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dressSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Dress = mongoose.model("Dress", dressSchema);

module.exports = { Dress };
