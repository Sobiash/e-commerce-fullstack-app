// const productRoutes = require("./product_route");
// const shopRoutes = require("./shop_route");
// const categoriesRoutes = require("./categories_route");
// const userRoutes = require("./user_route");
// const adminRoutes = require("./admin_route");
// const registerLoginRoutes = require("./registerLogin_route");
// const cartRoutes = require("./cart_route");
// const paymentRoutes = require("./payment_route");
// const siteRoutes = require("./site_route");

// module.exports = {
//   productRoutes,
//   shopRoutes,
//   categoriesRoutes,
//   userRoutes,
//   adminRoutes,
//   registerLoginRoutes,
//   cartRoutes,
//   paymentRoutes,
//   siteRoutes
// };

require("fs")
  .readdirSync(__dirname + "/")
  .forEach(file => {
    if (file.match(/\.js$/) !== null && file !== "index.js") {
      const name = file.replace(".js", "");
      exports[name] = require("./" + file);
    }
  });
