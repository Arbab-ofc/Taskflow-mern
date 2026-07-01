const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { verifyToken } = require("../utils/jwt");

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization || "";
  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    throw new AppError("Not authorized, missing token", 401);
  }

  let decoded;

  try {
    decoded = verifyToken(token);
  } catch (error) {
    throw new AppError("Not authorized, invalid token", 401);
  }

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("Not authorized, user not found", 401);
  }

  req.user = user;
  next();
});

module.exports = {
  protect,
};
