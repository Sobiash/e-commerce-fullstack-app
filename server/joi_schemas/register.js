const Joi = require("joi");

const name = Joi.string()
  .min(2)
  .error(new Error("Name field is required."));

const lastname = Joi.string()
  .min(2)
  .error(new Error("Lastname field is required."));

const email = Joi.string()
  .email()
  .trim()
  .lowercase()
  .error(new Error("Invalid email format"));

const username = Joi.string()
  .regex(/^[a-zA-Z0-9]{5,30}$/)
  .error(new Error("Invalid username format"));

const password = Joi.string()
  .min(6)
  .max(255)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,255}$/)
  .error(
    new Error(
      "Passowrd must be 6 characters long and contain at least one non-alphabetic character. "
    )
  );

const confirmPassword = Joi.string()
  .required()
  .valid(Joi.ref("password"))
  .error(new Error("Passowrd do not match."));

const profileImage = Joi.string().error(new Error("Somethig went wrong"));

const schemas = {
  registerUser: Joi.object()
    .keys({
      name: name.required(),
      lastname: lastname.required(),
      email: email.required(),
      username: username.required(),
      profileImage,
      password: password.required(),
      confirmPassword: confirmPassword.required()
    })
    .required(),

  updateProfile: Joi.object()
    .keys({
      name: name.required(),
      lastname: lastname.required(),
      email: email.required(),
      username,
      profileImage,
      password: password.required()
    })
    .required()
};

module.exports = {
  validateUserData: schemaType => (req, res, next) => {
    const result = Joi.validate(req.body, schemas[schemaType]);
    if (result.error)
      return res.status(400).json({
        error: result.error.message
      });
    next();
  }
};
