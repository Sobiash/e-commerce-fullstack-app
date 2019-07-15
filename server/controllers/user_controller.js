const { User, hashPassword, generateResetToken } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
const moment = require("moment");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const _ = require("lodash");
const { logger } = require("../utils/logger");

const userController = {};

userController.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(200).json({
        isAdmin: req.user.role === 0 ? false : true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        username: req.user.username,
        profileImage: req.user.profileImage,
        role: req.user.role,
        orderHistory: req.user.history
      });
    } else {
      return res.status(400).json({
        error: "Could not find any user!"
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userController.requestReset = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["email"]);
    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res
        .status(409)
        .json({ error: `No such user found for email ${body.email}` });
    }

    await generateResetToken(user);

    sendEmail(user.email, user.name, null, "reset-password", user);
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userController.resetUserPassword = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "resetToken",
      "password",
      "confirmPassword"
    ]);

    const today = moment()
      .startOf("day")
      .valueOf();

    const user = await User.findOne({
      resetToken: body.resetToken,
      resetTokenExpiration: {
        $gte: today
      }
    });

    if (!user) {
      return res.json({
        message: "This token is invalid or expired, generate a new one."
      });
    } else {
      user.password = body.password;
      user.resetToken = "";
      user.resetTokenExpiration = "";

      const hash = await hashPassword(user.password);
      user.password = hash;

      const payload = { id: user._id, name: user.name };
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: 72000 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
      return user;
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userController.updateProfile = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "lastname",
      "email",
      "username",
      "profileImage",
      "password"
    ]);

    const user = await User.findOne(req.user._id);
    if (!user) {
      return res.json({
        message: "Sorry, something went wrong."
      });
    } else {
      const hash = await hashPassword(body.password);
      body.password = hash;
      user.name = body.name;
      user.lastname = body.lastname;
      user.username = body.username;
      user.email = body.email;
      user.password = hash;
      user.profileImage = body.profileImage;
      user.updatedAt = Date.now();

      user.save((err, doc) => {
        if (err) return res.status(400).json({ err });
        return res.status(200).json({
          success: true
        });
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userController.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      await user.remove();
      res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ error: "Could not find any user!" });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

userController.postalAddress = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "street",
      "city",
      "zipCode",
      "country"
    ]);

    const exists = await PostalAddress.findOne({ user: req.body.user });
    if (exists) {
      res.json(exists);
      return;
    } else {
      const postalAddress = await new PostalAddress(body);
      await postalAddress.save();
      res.status(200).json(postalAddress);
    }
  } catch (error) {
    logger.error(error);
    res.status(404).json({ error: "No cart" });
  }
};

module.exports = userController;
