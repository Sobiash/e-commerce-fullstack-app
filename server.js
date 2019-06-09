const express = require("express");
("cookie-parser");

const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const passport = require("passport");
const cloudinary = require("cloudinary");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require("./server/config/passport")(passport);

cloudinary.config({
  cloud_name: "fashe",
  api_key: "123494699886532",
  api_secret: "m7Qr9cqQZMV5rZBWMkns-YvjekI"
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

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://localhost:27017/e-commerce-fullstack-app"
);

app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
