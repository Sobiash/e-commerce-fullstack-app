const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const moment = require("moment");
const SALT_I = 10;
require("dotenv").config();
const { logger } = require("../utils/logger");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: 1
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Number
  },
  stripe_customer: {}
});

const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(SALT_I);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

const generateResetToken = async user => {
  try {
    const resetToken = (await promisify(crypto.randomBytes)(20)).toString(
      "hex"
    );

    const today = moment()
      .startOf("day")
      .valueOf();

    const tomorrow = moment(today)
      .endOf("day")
      .valueOf();

    user.resetToken = resetToken;
    user.resetTokenExpiration = tomorrow;
    user.save();
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  jwt.verify(token, "A3.Fw+T~.fo", function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User, hashPassword, generateResetToken };
