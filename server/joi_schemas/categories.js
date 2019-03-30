const Joi = require("joi");

const name = Joi.string()
  .trim()
  .error(new Error("Title is required"));

const schemas = {
  postColor: Joi.object()
    .keys({
      name: name.required()
    })
    .required(),

  postDress: Joi.object()
    .keys({
      name: name.required()
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
