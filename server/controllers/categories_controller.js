const { Color } = require("../models/color");
const { Dress } = require("../models/dress");

const categoriesController = {};

categoriesController.postColor = (req, res) => {
  const color = new Color(req.body);
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

categoriesController.getColors = (req, res) => {
  Color.find({}, (err, colors) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(colors);
  });
};

categoriesController.postDress = (req, res) => {
  const dress = new Dress(req.body);
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

categoriesController.getDresses = (req, res) => {
  Dress.find({}, (err, dresses) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(dresses);
  });
};

module.exports = categoriesController;
