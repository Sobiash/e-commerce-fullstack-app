const { User } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
const moment = require("moment");
const _ = require("lodash");
const { logger } = require("../utils/logger");

const userController = {};

userController.resetUser = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["email"]);
    const user = User.findOne({ email: body.email });

    if (user) {
      user.generateResetToken((err, user) => {
        if (err) return res.json({ err });
        sendEmail(user.email, user.name, null, "reset-password", user);
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

userController.resetUserPassword = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["resetToken", "password"]);
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
        message: "Sorry, bad token, generate a new one."
      });
    } else {
      user.password = body.password;
      user.resetToken = "";
      user.resetTokenExpiration = "";

      user.save((err, doc) => {
        if (err) return res.json({ err });
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

userController.updateProfile = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "lastname",
      "email",
      "password"
    ]);

    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.json({
        message: "Sorry, something went wrong."
      });
    } else {
      user.name = body.name;
      user.lastname = body.lastname;
      user.email = body.email;
      user.password = body.password;

      user.save((err, doc) => {
        if (err) return res.json({ err });
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
    await User.findOneAndRemove({ _id: req.user._id });
    return res.json({ success: true });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = userController;
