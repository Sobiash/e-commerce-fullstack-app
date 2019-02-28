const { User } = require("../models/user");
const userController = {};

userController.resetUserPassword = (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      user.generateResetToken((err, user) => {
        if (err) return res.json({ success: false, err });
        sendEmail(user.name, user.email, null, "reset_password", user);
        return res.json({ success: true });
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
