const { User } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
const { registerUser, loginUser } = require("../schemas/user");
const Joi = require("joi");
const _ = require("lodash");

const registerLoginController = {};

registerLoginController.authUser = (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
};

registerLoginController.registerUser = async (req, res) => {
  const { error } = await Joi.validate(req.body, registerUser);
  const body = await _.pick(req.body, [
    "name",
    "lastname",
    "email",
    "password"
  ]);

  const user = await new User(body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    sendEmail(doc.email, doc.name, null, "welcome");
    return res.status(200).json({
      success: true,
      userdata: doc
    });
  });

  if (error) return res.status(401).json({ success: false, error });
};

registerLoginController.loginUser = (req, res) => {
  const { error } = Joi.validate(req.body, loginUser).then(() => {
    const body = _.pick(req.body, ["email", "password"]);

    User.findOne({ email: body.email }, (err, user) => {
      if (!user)
        return res.json({
          loginSuccess: false,
          message: "Auth failed, email not found"
        });
      user.comparePassword(body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({ loginSuccess: false, message: "Wrong Password" });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res
            .cookie("w_auth", user.token)
            .status(200)
            .json({
              loginSuccess: true
            });
        });
      });
    });
  });
  if (error) return res.status(401).json({ success: false, error });
};

registerLoginController.logoutUser = (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
};

module.exports = registerLoginController;
