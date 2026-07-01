const assert = require("../helpers/assert");
const { createTask } = require("../helpers/taskFactory");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runStatusHistoryTests = async (app) => {
  const auth = await createAuthSession(app);
  const task = await createTask(app, {}, auth.token);
  assert(task.statusHistory.length === 1, "Expected initial status history entry");

  const response = await invoke(app, {
    method: "PUT",
    url: `/api/tasks/${task._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
    body: { status: "in-progress" },
  });
  assert(response.statusCode === 200, "Expected status update to succeed");
  assert(response.body.data.status === "in-progress", "Expected updated status");
  assert(response.body.data.statusHistory.length === 2, "Expected status change history");
  assert(response.body.data.statusHistory[1].from === "pending", "Expected previous status");
  assert(response.body.data.statusHistory[1].to === "in-progress", "Expected new status");
};

module.exports = runStatusHistoryTests;
