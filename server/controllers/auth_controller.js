const { User, hashPassword } = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mail/mail");
const bcrypt = require("bcrypt");
const _ = require("lodash");
require("dotenv").config();
const logger = require("../utils/logger");

const authController = {};

authController.registerUser = async (req, res) => {
  try {
    const body = await _.pick(req.body, [
      "name",
      "lastname",
      "email",
      "password",
      "confirmPassword"
    ]);

    const exists = await User.findOne({ email: body.email });
    if (exists) {
      res.status(400).json({
        error: "This email is already in use."
      });
      res.redirect("/api/users/register");
      return;
    }

    const hash = await hashPassword(body.password);

    body.password = hash;

    const user = await new User(body);
    await user.save();
    res.json(user);

    sendEmail(body.email, body.name, null, "welcome");
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

authController.loginUser = async (req, res) => {
  try {
    const body = await _.pick(req.body, ["email", "password"]);

    const user = await User.findOne({ email: body.email });

    if (!user) {
      return res.status(404).json({
        error: "User not found."
      });
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Incorrect password" });
    } else {
      const payload = { id: user._id, name: user.name };
      jwt.sign(payload, "A3.Fw+T~.fo", { expiresIn: 7200 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = authController;
