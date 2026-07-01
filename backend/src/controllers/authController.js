const bcrypt = require("bcryptjs");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/responses");
const { signToken } = require("../utils/jwt");

const toAuthPayload = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});

const createTokenResponse = (res, user, statusCode, message) => {
  const token = signToken({ id: user._id.toString() });

  sendSuccess(res, {
    statusCode,
    message,
    data: {
      user: toAuthPayload(user),
      token,
    },
  });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.validated.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  createTokenResponse(res, user, 201, "Account created successfully");
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  createTokenResponse(res, user, 200, "Logged in successfully");
});

const getProfile = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    data: {
      user: toAuthPayload(req.user),
    },
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
