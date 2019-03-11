const Joi = require("joi");

const name = Joi.string()
  .min(5)
  .max(50)
  .required()
  .label("Name");
const lastname = Joi.string()
  .min(5)
  .max(50)
  .required()
  .label("Last Name");
const email = Joi.string()
  .min(5)
  .max(255)
  .required()
  .email()
  .lowercase()
  .label("Email");
const password = Joi.string()
  .min(5)
  .max(255)
  .required()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,255}$/)
  .label("Password");

const registerUser = Joi.object().keys({
  email,
  name,
  lastname,
  password
});
const loginUser = Joi.object().keys({
  email,
  password
});

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
