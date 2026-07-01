const assert = require("../helpers/assert");
const { createTask } = require("../helpers/taskFactory");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runCrudTests = async (app) => {
  const auth = await createAuthSession(app);
  const task = await createTask(app, {}, auth.token);

  let response = await invoke(app, {
    method: "GET",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected get task to succeed");
  assert(response.body.success === true, "Expected success response");
  assert(response.body.data.title === "Review launch checklist", "Unexpected task title");

  response = await invoke(app, {
    method: "PUT",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
    body: {
      title: "Review launch checklist",
      description: "Validate all deployment steps before the release window.",
      priority: "medium",
    },
  });
  assert(response.statusCode === 200, "Expected update to succeed");
  assert(response.body.message === "Task updated successfully", "Unexpected update message");
  assert(response.body.data.priority === "medium", "Task priority was not updated");

  response = await invoke(app, {
    method: "DELETE",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected delete to succeed");

  response = await invoke(app, {
    method: "GET",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 404, "Expected task to be deleted");
};

module.exports = runCrudTests;
