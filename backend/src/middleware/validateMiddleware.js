const AppError = require("../utils/AppError");

const formatZodError = (error) =>
  error.issues
    .map((issue) => {
      const path = issue.path.join(".");
      return path ? `${path}: ${issue.message}` : issue.message;
    })
    .join(", ");

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    next(new AppError(formatZodError(result.error), 400));
    return;
  }

  req.validated = result.data;
  next();
};

module.exports = validate;
