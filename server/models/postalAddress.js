const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postalAddressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  postalAddress: {
    street: { type: String },
    city: { type: String },
    zipCode: { type: String },
    country: { type: String }
  }
});

const PostalAddress = mongoose.model("PostalAddress", postalAddressSchema);

module.exports = { PostalAddress };
