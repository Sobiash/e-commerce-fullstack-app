const cloudinary = require("cloudinary");

const adminController = {};

adminController.uploadImage = (req, res) => {
  cloudinary.uploader.upload(
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
};

adminController.removeImage = (req, res) => {
  let public_id = req.query.public_id;
  cloudinary.uploader.destroy(public_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("ok");
  });
};

module.exports = adminController;
