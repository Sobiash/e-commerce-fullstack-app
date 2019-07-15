const Joi = require("joi");

const street = Joi.string()
  .regex(/A - Za - z - 0 - 99999999/)
  .error(new Error("Name field is required."));

const city = Joi.string()
  .regex(/A - Za - z - 0 - 99999999/)
  .error(new Error("Name field is required."));

const zipCode = Joi.string()
  .regex(/A - Za - z - 0 - 99999999/)
  .error(new Error("Name field is required."));

const country = Joi.string()
  .regex(/A - Za - z - 0 - 99999999/)
  .error(new Error("Name field is required."));

const schemas = {
  postalAddress: Joi.object()
    .keys({
      street: street.required(),
      city: city.required(),
      zipCode: zipCode.required(),
      country: country.required()
    })
    .required()
};

module.exports = {
  validateAddress: schemaType => (req, res, next) => {
    const result = Joi.validate(req.body, schemas[schemaType]);
    if (result.error)
      return res.status(400).json({
        error: result.error.message
      });
    next();
  }
};
