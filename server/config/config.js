const stripe = require("stripe");
const stripeConfig = stripe(process.env.STRIPE_SECRET_KEY);

const env = {
  isDev: process.env.NODE_ENV == "development",
  isTest: process.env.NODE_ENV == "test",
  isProd: process.env.NODE_ENV == "production"
};

const mongoUri = !env.isProd
  ? "mongodb://localhost:27017/e-commerce-fullstack-app"
  : "mongodb://sobia.shahbaz:Vestfold123@ds261828.mlab.com:61828/heroku_j6g2srgr";

const tokenSecret = !env.isProd ? "SUPERSECRETPASSWORD123" : "A3.Fw;+T~.$@fo";

function requiredEnvs(envsArr) {
  envsArr.forEach(env => {
    if (!process.env[env]) {
      throw `missing enviroment variable ${env}`;
    }
  });
}

module.exports = {
  mongoConf: {
    uri: mongoUri
  },
  expressConf: {
    port: process.env.PORT || 3002
  },
  tokenSecret,
  env,
  stripeConfig
};
