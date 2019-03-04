const { User } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
const moment = require("moment");

const userController = {};

userController.resetUser = (req, res) => {
  User.findOne(
    {
      email: req.body.email
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
  var today = moment()
    .startOf("day")
    .valueOf();
  User.findOne(
    {
      resetToken: req.body.resetToken,
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

      user.password = req.body.password;
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
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
};

module.exports = userController;
