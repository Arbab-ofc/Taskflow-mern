const { createTask } = require("../helpers/taskFactory");
const assert = require("../helpers/assert");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runValidationTests = async (app) => {
  const auth = await createAuthSession(app);

  let response = await invoke(app, {
    method: "POST",
    url: "/api/tasks",
    headers: { authorization: `Bearer ${auth.token}` },
    body: { title: "No", description: "Too short", status: "invalid", priority: "medium" },
  });
  assert(response.statusCode === 400, "Expected validation error");
  assert(response.body.success === false, "Expected validation error response");
  assert(response.body.message.includes("Title"), "Expected title validation message");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks/not-a-valid-id",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 400, "Expected invalid ID error");

  const task = await createTask(app, {}, auth.token);
  response = await invoke(app, {
    method: "PUT",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
    body: { unknown: "field" },
  });
  assert(response.statusCode === 400, "Expected update validation error");
};

module.exports = runValidationTests;
