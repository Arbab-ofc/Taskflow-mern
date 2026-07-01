const sendSuccess = (res, { statusCode = 200, message, data, meta } = {}) => {
  const body = { success: true };

  if (message) body.message = message;
  if (meta) Object.assign(body, meta);
  if (data !== undefined) body.data = data;

  return res.status(statusCode).json(body);
};

module.exports = { sendSuccess };
