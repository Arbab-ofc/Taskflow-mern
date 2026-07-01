const pinoHttp = require("pino-http");
const logger = require("../logger/logger");

const requestLogger = pinoHttp({
  logger,
  autoLogging: process.env.NODE_ENV !== "test",
  customLogLevel(req, res, err) {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
});

module.exports = requestLogger;
