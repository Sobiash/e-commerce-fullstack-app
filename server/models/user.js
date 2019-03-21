const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const SALT_I = 10;
require("dotenv").config();

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExpiration: {
    type: Number
  },
  seller: {
    type: Boolean,
    default: false
  },
  stripe_seller: {},
  stripe_customer: {}
});

userSchema.pre("save", function(next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function(cb) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.TOKEN_SECRET);

  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.methods.generateResetToken = function(cb) {
  const user = this;

  crypto.randomBytes(20, function(err, buffer) {
    const token = buffer.toString("hex");
    const today = moment()
      .startOf("day")
      .valueOf();
    const tomorrow = moment(today)
      .endOf("day")
      .valueOf();

    user.resetToken = token;
    user.resetTokenExpiration = tomorrow;
    user.save(function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.statics.findByToken = function(token, cb) {
  const user = this;
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
