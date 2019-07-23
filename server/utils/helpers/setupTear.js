const mongoose = require("mongoose");

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
          })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          });
      });
    } else {
      mongoose
        .connect(
          process.env.MONGODB_URI ||
            "mongodb://localhost:27017/e-commerce-fullstack-app",
          {
            useNewUrlParser: true,
            useCreateIndex: true
          }
        )
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
