const { User } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
const moment = require("moment");
const _ = require("lodash");
const { logger } = require("../utils/logger");

const userController = {};

userController.resetUser = (req, res) => {
  const body = _.pick(req.body, ["email"]);
  User.findOne(
    {
      email: body.email
    },
    (err, user) => {
      user.generateResetToken((err, user) => {
        if (err) return res.json({ success: false, err });
        sendEmail(user.email, user.name, null, "reset-password", user);
        return res.json({ success: true });
      });
    }
  );
};

userController.resetUserPassword = (req, res) => {
  const body = _.pick(req.body, ["resetToken", "password"]);
  var today = moment()
    .startOf("day")
    .valueOf();
  User.findOne(
    {
      resetToken: body.resetToken,
      resetTokenExpiration: {
        $gte: today
      }
    },
    (err, user) => {
      if (!user)
        return res.json({
          success: false,
          message: "Sorry, token bad, generate a new one."
        });

      user.password = body.password;
      user.resetToken = "";
      user.resetTokenExpiration = "";

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true
        });
      });
    }
  );
};

userController.updateProfile = (req, res) => {
  const body = _.pick(req.body, ["name", "lastname", "email", "password"]);
  User.findOne(
    {
      _id: req.user._id
    },
    (err, user) => {
      if (!user)
        return res.json({
          success: false,
          message: "Sorry, something went wrong."
        });

      user.name = body.name;
      user.lastname = body.lastname;
      user.email = body.email;
      user.password = body.password;

      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
          success: true
        });
      });
    }
  );
};

module.exports = userController;
