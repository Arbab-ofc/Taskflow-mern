const assert = require("../helpers/assert");
const { createTask } = require("../helpers/taskFactory");
const { createAuthSession } = require("../helpers/authFactory");
const invoke = require("../helpers/request");

const runQueryFilterSortTests = async (app) => {
  const auth = await createAuthSession(app);

  await createTask(
    app,
    {
      title: "High priority planning",
      description: "Prepare the product launch planning document.",
      status: "pending",
      priority: "high",
    },
    auth.token
  );
  await createTask(
    app,
    {
      title: "Mobile QA pass",
      description: "Validate the dashboard experience on mobile screens.",
      status: "in-progress",
      priority: "medium",
    },
    auth.token
  );
  await createTask(
    app,
    {
      title: "Archive completed notes",
      description: "Move completed notes into the team archive folder.",
      status: "completed",
      priority: "low",
    },
    auth.token
  );

  let response = await invoke(app, {
    method: "GET",
    url: "/api/tasks?status=in-progress&priority=medium&page=1&limit=2",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected filtered request to succeed");
  assert(response.body.count === 1, "Expected one filtered task");
  assert(response.body.total === 1, "Expected one filtered total");
  assert(response.body.data[0].title === "Mobile QA pass", "Unexpected filtered task");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks?sort=priority&page=1&limit=2",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected sort request to succeed");
  assert(response.body.count === 2, "Expected first page to contain two tasks");
  assert(response.body.total === 3, "Expected three total tasks");
  assert(response.body.pages === 2, "Expected two pages");
  assert(response.body.data[0].priority === "high", "Expected high priority first");

  response = await invoke(app, {
    method: "GET",
    url: "/api/tasks?search=archive",
    headers: { authorization: `Bearer ${auth.token}` },
  });
  assert(response.statusCode === 200, "Expected search request to succeed");
  assert(response.body.count === 1, "Expected one search result");
  assert(response.body.data[0].title === "Archive completed notes", "Unexpected search result");
};

module.exports = runQueryFilterSortTests;
