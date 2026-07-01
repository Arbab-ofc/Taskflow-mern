const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require("./logger/logger");
const requestLogger = require("./middleware/requestLogger");
const { getHealth } = require("./controllers/healthController");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const localOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];
const allowedOrigins = CLIENT_URL
  ? [...new Set([CLIENT_URL, ...localOrigins])]
  : localOrigins;

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({ success: true, message: "TaskFlow API is running" });
});
app.get("/health", getHealth);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      logger.info({ port: PORT }, "Server running");
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        logger.error({ port: PORT }, "Port already in use");
        process.exit(1);
      }

      throw error;
    });
  } catch (error) {
    logger.error({ err: error }, "Server startup failed");
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
