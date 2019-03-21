const { app, logger, mongoose } = require("./utils/logger");
const bodyParser = require("body-parser");
const { expressConf } = require("./config/config");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
// const path = require("path");
const cloudinary = require("cloudinary");
const { mongoConf } = require("./config/config");
const routes = require("./routes/index");
require("dotenv").config();

// if (app.get('env') == 'development') app.use(morgan('tiny'));

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

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

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
