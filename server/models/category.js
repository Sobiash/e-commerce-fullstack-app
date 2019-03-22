const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    required: true,
    type: String,
    unique: 1,
    maxlength: [100, "Too long, maximum 100 characters are allowed."]
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
