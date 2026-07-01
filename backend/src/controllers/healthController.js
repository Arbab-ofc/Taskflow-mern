const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/responses");

const getHealth = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    data: {
      status: "ok",
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      mongodb: {
        state: mongoose.connection.readyState,
        connected: mongoose.connection.readyState === 1,
        host: mongoose.connection.host || null,
      },
    },
  });
});

module.exports = { getHealth };
