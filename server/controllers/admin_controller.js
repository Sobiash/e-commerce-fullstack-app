const cloudinary = require("cloudinary");
const { logger } = require("../utils/logger");

const adminController = {};

adminController.uploadImage = async (req, res) => {
  try {
    await cloudinary.uploader.upload(
      req.files.file.path,
      result => {
        res.status(200).send({
          public_id: result.public_id,
          url: result.url
        });
      },
      {
        public_id: `${Date.now()}`,
        resource_type: "auto"
      }
    );
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

adminController.removeImage = async (req, res) => {
  try {
    let public_id = req.query.public_id;
    await cloudinary.uploader.destroy(public_id, (err, result) => {
      if (err) return res.json(err);
      res.status(200).send("ok");
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json(error);
  }
};

module.exports = adminController;
