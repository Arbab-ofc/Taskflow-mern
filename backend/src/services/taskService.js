const Task = require("../models/Task");
const AppError = require("../utils/AppError");

const priorityRank = {
  high: 1,
  medium: 2,
  low: 3,
};

const normalizeDueDate = (dueDate) => {
  if (dueDate === "" || dueDate === null) return null;
  if (dueDate === undefined) return undefined;
  return new Date(dueDate);
};

const normalizePayload = (payload) => {
  const normalized = { ...payload };

  if (Object.prototype.hasOwnProperty.call(normalized, "dueDate")) {
    normalized.dueDate = normalizeDueDate(normalized.dueDate);
  }

  return normalized;
};

const buildQuery = ({
  userId,
  search,
  status,
  priority,
  includeDeleted = false,
  onlyDeleted = false,
}) => {
  const query = {};

  if (userId) {
    query.user = userId;
  }

  if (onlyDeleted) {
    query.deletedAt = { $ne: null };
  } else if (!includeDeleted) {
    query.deletedAt = null;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (status) query.status = status;
  if (priority) query.priority = priority;

  return query;
};

const getSort = (sort) => {
  if (sort === "oldest") return { createdAt: 1 };
  if (sort === "dueDate") return { dueDate: 1, createdAt: -1 };
  return { createdAt: -1 };
};

const listTasks = async ({
  userId,
  search,
  status,
  priority,
  sort,
  page,
  limit,
  onlyDeleted = false,
}) => {
  const query = buildQuery({ userId, search, status, priority, onlyDeleted });
  const skip = (page - 1) * limit;
  const total = await Task.countDocuments(query);
  let tasks;

  if (sort === "priority") {
    tasks = await Task.aggregate([
      { $match: query },
      {
        $addFields: {
          priorityRank: {
            $switch: {
              branches: Object.entries(priorityRank).map(([key, value]) => ({
                case: { $eq: ["$priority", key] },
                then: value,
              })),
              default: 4,
            },
          },
        },
      },
      { $sort: { priorityRank: 1, createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { priorityRank: 0 } },
    ]);
  } else {
    tasks = await Task.find(query).sort(getSort(sort)).skip(skip).limit(limit);
  }

  return {
    tasks,
    meta: {
      count: tasks.length,
      total,
      page,
      pages: Math.max(Math.ceil(total / limit), 1),
      limit,
    },
  };
};

const getTaskStats = async (userId) => {
  const [stats] = await Task.aggregate([
    { $match: { user: userId, deletedAt: null } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
        inProgress: { $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] } },
        completed: { $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] } },
        highPriority: { $sum: { $cond: [{ $eq: ["$priority", "high"] }, 1, 0] } },
      },
    },
    { $project: { _id: 0 } },
  ]);

  return (
    stats || {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      highPriority: 0,
    }
  );
};

const getTaskById = async (id, userId, { includeDeleted = false } = {}) => {
  const query = includeDeleted
    ? { _id: id, user: userId }
    : { _id: id, user: userId, deletedAt: null };
  const task = await Task.findOne(query);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

const createTask = async (payload, userId) => {
  const normalized = normalizePayload(payload);

  return Task.create({
    ...normalized,
    user: userId,
    statusHistory: [
      {
        from: null,
        to: normalized.status || "pending",
        changedAt: new Date(),
      },
    ],
  });
};

const updateTask = async (id, userId, payload) => {
  const task = await getTaskById(id, userId);
  const normalized = normalizePayload(payload);
  const previousStatus = task.status;

  Object.assign(task, normalized);

  if (normalized.status && normalized.status !== previousStatus) {
    task.statusHistory.push({
      from: previousStatus,
      to: normalized.status,
      changedAt: new Date(),
    });
  }

  await task.save();
  return task;
};

const softDeleteTask = async (id, userId) => {
  const task = await getTaskById(id, userId);
  task.deletedAt = new Date();
  await task.save();
};

const restoreTask = async (id, userId) => {
  const task = await getTaskById(id, userId, { includeDeleted: true });

  if (!task.deletedAt) {
    throw new AppError("Task is not deleted", 400);
  }

  task.deletedAt = null;
  await task.save();
  return task;
};

module.exports = {
  listTasks,
  getTaskStats,
  getTaskById,
  createTask,
  updateTask,
  softDeleteTask,
  restoreTask,
};
