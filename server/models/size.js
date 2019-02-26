const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  }
});

const Size = mongoose.model("Size", sizeSchema);

module.exports = { Size };
