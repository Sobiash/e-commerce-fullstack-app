const express = require("express");
const { app, logger } = require("./server/utils/logger");
const { expressConf } = require("./server/config/config");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const passport = require("passport");
const mongoose = require("mongoose");

const { mongoConf } = require("./server/config/config");
const routes = require("./server/routes/index");
require("dotenv").config();

if (app.get("env") == "development") app.use(morgan("tiny"));

const { uri } = mongoConf;

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection.on("error", err => {
  console.error(`${err.message}`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

app.use(passport.initialize());
require("./server/config/passport")(passport);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api/admin", require("./server/routes/admin_route"));
app.use("/api/auth", require("./server/routes/auth_route"));
app.use("/api/cart", require("./server/routes/cart_route"));
app.use("/api/payment", require("./server/routes/payment_route"));
app.use("/api/product", require("./server/routes/product_route"));
app.use("/api/shop", require("./server/routes/shop_route"));
app.use("/api/users", require("./server/routes/user_route"));

mongoose.connect(process.env.MONGODB_URI || "localhost:3004");

// (async function() {
//   try {
//     for (let route in routes) {
//       logger.info(`Attaching route: ${route}`);
//       app.use(routes[route]);
//     }

//     const listener = app.listen(expressConf.port);
//     logger.info(`listening on port ${listener.address().port}`);
//   } catch (error) {
//     throw new Error(error);
//   }
// })();
