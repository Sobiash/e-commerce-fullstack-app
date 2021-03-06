const Joi = require("joi");

// const identifier = Joi.string()
//   .regex(
//     /^[a-zA-Z0-9]{5,30}$|^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   )
//   .error(new Error("Invalid username format"));

const email = Joi.string()
  .email()
  .trim()
  .lowercase()
  .error(new Error("Invalid email format"));

const password = Joi.string()
  .min(6)
  .max(255)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,255}$/)
  .error(new Error("Password is incorrect!"));

const schemas = {
  loginUser: Joi.object()
    .keys({
      email: email.required(),
      password: password.required()
    })
    .required()
};

module.exports = {
  validateLogin: schemaType => (req, res, next) => {
    const result = Joi.validate(req.body, schemas[schemaType]);
    if (result.error)
      return res.status(400).json({
        error: result.error.message
      });
    next();
  }
};
