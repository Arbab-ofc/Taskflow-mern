const assert = require("../helpers/assert");
const { createTask } = require("../helpers/taskFactory");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runSoftDeleteTests = async (app) => {
  const auth = await createAuthSession(app);
  const task = await createTask(app, {}, auth.token);

  let response = await invoke(app, {
    method: "DELETE",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected delete to succeed");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected list to succeed");
  assert(response.body.total === 0, "Soft deleted tasks should be excluded from list");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks/trash",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected trash list to succeed");
  assert(response.body.total === 1, "Trash should include soft deleted tasks");
  assert(response.body.data[0].deletedAt, "Trash task should include deletedAt");

  response = await invoke(app, {
    method: "GET",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 404, "Expected deleted task to be hidden");

  response = await invoke(app, {
    method: "POST",
    url: `/api/tasks/${task._id}/restore`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected restore to succeed");
  assert(response.body.message === "Task restored successfully", "Unexpected restore message");
  assert(response.body.data.deletedAt === null, "Expected restored task deletedAt to be null");

  response = await invoke(app, {
    method: "GET",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected restored task to be visible");
};

module.exports = runSoftDeleteTests;
