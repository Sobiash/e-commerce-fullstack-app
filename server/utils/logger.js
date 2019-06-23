require("dotenv").config();
const { env } = require("../config/config");
const express = require("express");

const app = express();

let logger;

if (env.isProd) {
  const winston = require("winston");
  const { LoggingWinston } = require("@google-cloud/logging-winston");
  const stackdriverLogging = new LoggingWinston();
  logger = new winston.Logger({
    level: "info",
    transports: [new winston.transports.Console(), stackdriverLogging]
  });
}

module.exports = {
  app,
  logger
};
