const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cloudinary = require("cloudinary");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on("error", err => {
  console.error(`${err.message}`);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build", "static")));
app.use(express.static(path.join(__dirname, "client", "public")));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const productRoutes = require("./routes/product_route");
const shopRoutes = require("./routes/shop_route");
const categoriesRoutes = require("./routes/categories_route");
const userRoutes = require("./routes/user_route");
const adminRoutes = require("./routes/admin_route");
const registerLoginRoutes = require("./routes/registerLogin_route");
const cartRoutes = require("./routes/cart_route");
const paymentRoutes = require("./routes/payment_route");
const siteRoutes = require("./routes/site_route");

app.use(productRoutes);
app.use(categoriesRoutes);
app.use(shopRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(registerLoginRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);
app.use(siteRoutes);

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
