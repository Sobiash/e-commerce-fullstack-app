const stripe = require("stripe");
const stripeConfig = stripe(process.env.STRIPE_SECRET_KEY);

const env = {
  isDev: process.env.NODE_ENV == "development",
  isTest: process.env.NODE_ENV == "test",
  isProd: process.env.NODE_ENV == "production"
};

if (env.isProd) requiredEnvs(["TOKEN_SECRET", "MONGO_URI"]);

const mongoUri = !env.isProd
  ? "mongodb://localhost:27017/e-commerce-fullstack-app"
  : process.env.MONGO_URI;

const tokenSecret = !env.isProd
  ? "SUPERSECRETPASSWORD123"
  : process.env.TOKEN_SECRET;

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
