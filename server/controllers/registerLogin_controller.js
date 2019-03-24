const { User, hashPassword } = require("../models/user");
const { sendEmail } = require("../utils/mail/mail");
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
  const body = await _.pick(req.body, [
    "name",
    "lastname",
    "email",
    "password"
  ]);

  const exists = await User.findOne({ email: body.email });
  if (exists) {
    res.json({
      loginSuccess: false,
      message: "Email is already in use."
    });
    res.redirect("/api/users/register");
    return;
  }

  const hash = await hashPassword(body.password);

  body.password = hash;

  const user = await new User(body);
  await user.save();

  sendEmail(body.email, body.name, null, "welcome");
};

registerLoginController.loginUser = async (req, res) => {
  const body = await _.pick(req.body, ["email", "password"]);

  await User.findOne({ email: body.email }, (err, user) => {
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
};

registerLoginController.logoutUser = async (req, res) => {
  await User.findOneAndUpdate(
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
