const express = require("express");
const { getProfile, login, register } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const { loginSchema, signupSchema } = require("../validators/authValidators");

const router = express.Router();

router.post("/signup", validate(signupSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", protect, getProfile);

module.exports = router;
