const { User, hashPassword } = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mail/mail");
const bcrypt = require("bcrypt");
const _ = require("lodash");
require("dotenv").config();
const logger = require("../utils/logger");

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
  try {
    const body = await _.pick(req.body, [
      "name",
      "lastname",
      "email",
      "password"
    ]);

    const exists = await User.findOne({ email: body.email });
    if (exists) {
      res.json({
        error: "Email is already in use."
      });
      res.redirect("/api/users/register");
      return;
    }

    const hash = await hashPassword(body.password);

    body.password = hash;

    const user = await new User(body);
    await user.save();

    sendEmail(body.email, body.name, null, "welcome");
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

registerLoginController.loginUser = async (req, res) => {
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
      return res.json({ error: "Password Incorrect" });
    } else {
      const payload = { id: user._id, name: user.name };
      jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    }
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

registerLoginController.logoutUser = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.user._id
      },
      { token: "" },
      (err, doc) => {
        if (err) return res.json(err);
        return res.status(200).send({
          success: true
        });
      }
    );
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = registerLoginController;
