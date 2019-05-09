const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: 100
  },
  dress: {
    type: Schema.Types.ObjectId,
    ref: "Dress",
    required: true
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
