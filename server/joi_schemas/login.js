const Joi = require("joi");

const email = Joi.string()
  .email()
  .trim()
  .lowercase()
  .error(new Error("Invalid email"));

const password = Joi.string()
  .min(6)
  .max(255)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,255}$/)
  .error(new Error(" Invalid passowrd. "));

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
