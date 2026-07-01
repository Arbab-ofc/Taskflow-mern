const assert = require("../helpers/assert");
const invoke = require("../helpers/request");

const runAuthTests = async (app) => {
  const email = `auth-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}@example.com`;

  let response = await invoke(app, {
    method: "POST",
    url: "/api/auth/signup",
    body: {
      name: "Auth User",
      email,
      password: "Password123!",
    },
  });
  assert(response.statusCode === 201, "Expected signup success");
  assert(response.body.success === true, "Expected signup success");
  assert(response.body.data.token, "Expected signup token");
  assert(response.body.data.user.email === email, "Expected returned user email");

  response = await invoke(app, {
    method: "POST",
    url: "/api/auth/login",
    body: {
      email,
      password: "Password123!",
    },
  });
  assert(response.statusCode === 200, "Expected login success");
  assert(response.body.data.token, "Expected login token");

  response = await invoke(app, {
    method: "GET",
    url: "/api/auth/me",
    headers: { authorization: `Bearer ${response.body.data.token}` },
  });
  assert(response.statusCode === 200, "Expected profile request to succeed");
  assert(response.body.data.user.email === email, "Expected profile email");
};

module.exports = runAuthTests;
