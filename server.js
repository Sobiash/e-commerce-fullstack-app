const { app, logger } = require("./server/utils/logger");
const bodyParser = require("body-parser");
const { expressConf } = require("./server/config/config");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const passport = require("passport");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");

const { mongoConf } = require("./server/config/config");
const routes = require("./server/routes/index");
require("dotenv").config();

// if (app.get("env") === "development") app.use(morgan("tiny"));

const { uri } = mongoConf;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("error", err => {
  console.error(`${err.message}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
require("./server/config/passport")(passport);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

if (app.get("env") === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

(async function() {
  try {
    for (let route in routes) {
      logger.info(`Attaching route: ${route}`);
      app.use(routes[route]);
    }

    const listener = app.listen(expressConf.port);
    logger.info(`listening on port ${listener.address().port}`);
  } catch (error) {
    throw new Error(error);
  }
})();
