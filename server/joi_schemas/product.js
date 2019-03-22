const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const name = Joi.string()
  .trim()
  .error(new Error("Name required"));
const description = Joi.string().error(new Error("Description required"));

const price = Joi.number();
const category = Joi.objectId();
const dress = Joi.objectId();
const color = Joi.objectId();
const shipping = Joi.number();
const available = Joi.bool();
const publish = Joi.bool();
const images = Joi.array().items(Joi.string());

const schemas = {
  postArticle: Joi.object()
    .keys({
      name: name.required(),
      description: description.required(),
      price: price.required(),
      category: category.required(),
      dress: dress.required(),
      color: color.required(),
      available: available.required(),
      publish: publish.required(),
      images: images.required(),
      shipping
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
