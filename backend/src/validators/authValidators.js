const { z } = require("zod");

const emailSchema = z.string().trim().email("Enter a valid email address");

const signupSchema = z.object({
  body: z
    .object({
      name: z.string().trim().min(2, "Name must be at least 2 characters"),
      email: emailSchema,
      password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .strict(),
});

const loginSchema = z.object({
  body: z
    .object({
      email: emailSchema,
      password: z.string().min(1, "Password is required"),
    })
    .strict(),
});

module.exports = {
  signupSchema,
  loginSchema,
};
