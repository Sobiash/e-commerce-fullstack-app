const Joi = require("joi");

const name = Joi.string()
  .trim()
  .error(new Error("Product name is required."));

const description = Joi.string().error(
  new Error("Product description is required.")
);
const price = Joi.number();
const discount = Joi.number();
const color = Joi.array()
  .items(Joi.string())
  .single();
const size = Joi.array()
  .items(Joi.string())
  .single();
const category = Joi.array()
  .items(Joi.string())
  .single();
const tags = Joi.array()
  .items(Joi.string())
  .single();
const dress = Joi.array()
  .items(Joi.string())
  .single();
const shipping = Joi.number();
const available = Joi.bool();
const sale = Joi.bool();
const publish = Joi.bool();
const images = Joi.array();

const schemas = {
  postArticle: Joi.object()
    .keys({
      name: name.required(),
      description: description.required(),
      price: price.required(),
      discount,
      category: category.required(),
      dress: dress.required(),
      color: color.required(),
      tags,
      sale,
      size: size.required(),
      available: available.required(),
      publish: publish,
      images: images.required(),
      shipping
    })
    .required(),

  updateProduct: Joi.object()
    .keys({
      name: name.required(),
      description: description.required(),
      price: price.required(),
      discount,
      category: category.required(),
      dress: dress.required(),
      color: color.required(),
      tags,
      sale,
      size: size.required(),
      available: available.required(),
      publish: publish,
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
