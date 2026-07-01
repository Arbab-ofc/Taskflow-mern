const pino = require("pino");

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

const logger = pino({
  level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
  enabled: !isTest,
  base: isProduction ? undefined : null,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    !isProduction && !isTest
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
});

module.exports = logger;
