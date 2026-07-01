const assert = require("../helpers/assert");
const { createTask } = require("../helpers/taskFactory");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runStatsTests = async (app) => {
  const auth = await createAuthSession(app);
  const pending = await createTask(app, {
    title: "Pending dashboard task",
    description: "Keep this task in pending state for stats.",
    status: "pending",
    priority: "high",
  }, auth.token);
  await createTask(app, {
    title: "Completed dashboard task",
    description: "Keep this task in completed state for stats.",
    status: "completed",
    priority: "medium",
  }, auth.token);

  let response = await invoke(app, {
    method: "GET",
    url: "/api/tasks/stats",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected stats request to succeed");
  assert(response.body.data.total === 2, "Expected two active tasks");
  assert(response.body.data.pending === 1, "Expected one pending task");
  assert(response.body.data.completed === 1, "Expected one completed task");
  assert(response.body.data.highPriority === 1, "Expected one high priority task");

  response = await invoke(app, {
    method: "DELETE",
    url: `/api/tasks/${pending._id}`,
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected delete to succeed");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks/stats",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected stats refresh to succeed");
  assert(response.body.data.total === 1, "Soft deleted tasks should be excluded from stats");
  assert(response.body.data.pending === 0, "Soft deleted pending task should be excluded");
};

module.exports = runStatsTests;
