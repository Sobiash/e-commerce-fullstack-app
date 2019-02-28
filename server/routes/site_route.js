const express = require("express");
const router = express.Router();
const siteController = require("../controllers/site_controller");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

router.post("/api/site/site-data", auth, admin, siteController.editSiteInfo);
router.get("/api/site/site-data", siteController.getSiteInfo);

module.exports = router;
