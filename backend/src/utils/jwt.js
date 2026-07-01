const jwt = require("jsonwebtoken");

const getJwtSecret = () => process.env.JWT_SECRET || "taskflow-dev-secret";

const signToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  signToken,
  verifyToken,
};
