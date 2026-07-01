const assert = require("./assert");
const invoke = require("./request");

const createAuthSession = async (app, overrides = {}) => {
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const payload = {
    name: `Test User ${id}`,
    email: `taskflow-${id}@example.com`,
    password: "Password123!",
    ...overrides,
  };

  const response = await invoke(app, {
    method: "POST",
    url: "/api/auth/signup",
    body: payload,
  });
  assert(response.statusCode === 201, "Expected signup to succeed");
  assert(response.body.data?.token, "Expected auth token from signup");

  return {
    user: response.body.data.user,
    token: response.body.data.token,
    payload,
  };
};

module.exports = {
  createAuthSession,
};
