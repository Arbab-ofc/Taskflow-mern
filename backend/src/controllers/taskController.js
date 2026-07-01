const taskService = require("../services/taskService");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/responses");

const getTasks = asyncHandler(async (req, res) => {
  const { tasks, meta } = await taskService.listTasks({
    ...req.validated.query,
    userId: req.user._id,
  });

  sendSuccess(res, {
    meta,
    data: tasks,
  });
});

const getDeletedTasks = asyncHandler(async (req, res) => {
  const { tasks, meta } = await taskService.listTasks({
    ...req.validated.query,
    userId: req.user._id,
    onlyDeleted: true,
  });

  sendSuccess(res, {
    meta,
    data: tasks,
  });
});

const getTaskStats = asyncHandler(async (req, res) => {
  const stats = await taskService.getTaskStats(req.user._id);

  sendSuccess(res, { data: stats });
});

const getTask = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.validated.params.id, req.user._id);

  sendSuccess(res, { data: task });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.validated.body, req.user._id);

  sendSuccess(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: task,
  });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(
    req.validated.params.id,
    req.user._id,
    req.validated.body
  );

  sendSuccess(res, {
    message: "Task updated successfully",
    data: task,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.softDeleteTask(req.validated.params.id, req.user._id);

  sendSuccess(res, {
    message: "Task deleted successfully",
  });
});

const restoreTask = asyncHandler(async (req, res) => {
  const task = await taskService.restoreTask(req.validated.params.id, req.user._id);

  sendSuccess(res, {
    message: "Task restored successfully",
    data: task,
  });
});

module.exports = {
  getTasks,
  getDeletedTasks,
  getTaskStats,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  restoreTask,
};
