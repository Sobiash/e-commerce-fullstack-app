const { Color } = require("../models/color");
const { Dress } = require("../models/dress");
const _ = require("lodash");

const categoriesController = {};

categoriesController.postColor = async (req, res) => {
  const body = await _.pick(req.body, ["name"]);
  const color = await new Color(body);

  color.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    res.status(200).json({
      success: true,
      color: doc
    });
  });
};

categoriesController.getColors = async (req, res) => {
  await Color.find({}, (err, colors) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(colors);
  });
};

categoriesController.postDress = async (req, res) => {
  const body = await _.pick(req.body, ["name"]);
  const dress = await new Dress(body);

  dress.save((err, doc) => {
    if (err)
      return res.json({
        success: false,
        err
      });
    res.status(200).json({
      success: true,
      dress: doc
    });
  });
};

categoriesController.getDresses = async (req, res) => {
  await Dress.find({}, (err, dresses) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(dresses);
  });
};

module.exports = categoriesController;
