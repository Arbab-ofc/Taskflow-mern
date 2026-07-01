const invoke = require("./request");

const baseTask = {
  title: "Review launch checklist",
  description: "Validate all deployment steps before the release window.",
  status: "pending",
  priority: "high",
  dueDate: "2026-08-01",
};

const createTask = async (app, overrides = {}, token) => {
  const response = await invoke(app, {
    method: "POST",
    url: "/api/tasks",
    body: { ...baseTask, ...overrides },
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  });

  if (response.statusCode !== 201) {
    throw new Error(response.body?.message || "Expected task creation to succeed");
  }

  return response.body.data;
};

module.exports = {
  baseTask,
  createTask,
};
