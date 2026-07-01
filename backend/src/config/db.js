const mongoose = require("mongoose");
const logger = require("../logger/logger");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is required");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  logger.info({ host: conn.connection.host }, "MongoDB connected");
};

module.exports = connectDB;
