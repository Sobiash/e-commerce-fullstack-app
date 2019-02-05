const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});
// mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//models
const { User } = require("./models/user");
const { Color } = require("./models/color");
const { Product } = require("./models/product");
// const { Size } = require("./models/size");
const { Dress } = require("./models/dress");

//middlewares
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

// size => Frets
// app.post("/api/product/size", auth, admin, (req, res) => {
//   const size = new Size(req.body);
//   size.save((err, doc) => {
//     if (err)
//       return res.json({
//         success: false,
//         err
//       });
//     res.status(200).json({
//       success: true,
//       size: doc
//     });
//   });
// });

// app.get("/api/product/sizes", (req, res) => {
//   Size.find({}, (err, sizes) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).send(sizes);
//   });
// });

//colors => Woods
app.post("/api/product/color", auth, admin, (req, res) => {
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
});

app.get("/api/product/colors", (req, res) => {
  Color.find({}, (err, colors) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(colors);
  });
});

//dress => Brands
app.post("/api/product/dress", auth, admin, (req, res) => {
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
});

app.get("/api/product/dresses", (req, res) => {
  Dress.find({}, (err, dresses) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(dresses);
  });
});

//products
// /api/product/article?id=HGDDJHGG&type=single
// /api/product/article?id=HGDDJHGG,HHFJHKJG,GHFHFHH&type=array

app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      article: doc
    });
  });
});

app.get("/api/product/articles_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map(item => {
      return mongoose.Types.ObjectId(item);
    });
  }
  Product.find({ _id: { $in: items } })
    .populate("dress")
    .populate("color")
    .populate("size")
    .exec((err, docs) => {
      return res.status(200).send(docs);
    });
});

//get products
// by arrival
// /api/product/articles?sortBy=createdAt&order=desc&limit=4
// by sold
// /api/product/articles?sortBy=sold&order=desc&limit=10
app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;

  Product.find()
    .populate("dress")
    .populate("color")
    .populate("size")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

//users

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      userdata: doc
    });
  });
});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong Password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true
          });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id
    },
    { token: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      });
    }
  );
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
