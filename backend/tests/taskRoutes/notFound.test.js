const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runNotFoundTests = async (app) => {
  const auth = await createAuthSession(app);

  let response = await invoke(app, { method: "GET", url: "/api/missing-route" });
  if (response.statusCode !== 404) {
    throw new Error("Expected missing route to return 404");
  }

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks/64b7f94f2f7a4b7f7f7f7f7f",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  if (response.statusCode !== 404) {
    throw new Error("Expected missing task to return 404");
  }
};

module.exports = runNotFoundTests;
