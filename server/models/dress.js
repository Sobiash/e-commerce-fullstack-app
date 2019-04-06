const mongoose = require("mongoose");

const dressSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Dress = mongoose.model("Dress", dressSchema);

module.exports = { Dress };
