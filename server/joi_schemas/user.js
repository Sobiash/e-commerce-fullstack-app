const Joi = require("joi");

const name = Joi.string().error(new Error("Name required"));
const lastname = Joi.string().error(new Error("Last name required"));
const email = Joi.string()
  .email()
  .trim()
  .lowercase()
  .error(new Error("Invalid email format"));
const password = Joi.string()
  .min(5)
  .max(255)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,255}$/)
  .error(
    new Error(
      "Passowrd must be 5 characters long and contain at least one non-alphabetic character. "
    )
  );

const resetToken = Joi.string().error(new Error("Invalid token"));

const schemas = {
  registerUser: Joi.object()
    .keys({
      email: email.required(),
      password: password.required(),
      name: name.required(),
      lastname: lastname.required()
    })
    .required(),

  loginUser: Joi.object()
    .keys({
      email: email.required(),
      password: password.required()
    })
    .required(),

  resetUser: Joi.object()
    .keys({
      email: email.required()
    })
    .required(),

  updateProfile: Joi.object()
    .keys({
      name: name.required(),
      lastname: lastname.required(),
      email: email.required(),
      password: password.required()
    })
    .required(),

  resetUserPassword: Joi.object()
    .keys({
      resetToken: resetToken.required(),
      password: password.required()
    })
    .required()
};

module.exports = {
  validateBody: schemaType => (req, res, next) => {
    const result = Joi.validate(req.body, schemas[schemaType]);
    if (result.error)
      return res.status(400).json({
        error: result.error.message
      });
    next();
  }
};
