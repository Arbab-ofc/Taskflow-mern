const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getTasks,
  getDeletedTasks,
  getTaskStats,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  restoreTask,
} = require("../controllers/taskController");
const validate = require("../middleware/validateMiddleware");
const {
  createTaskSchema,
  getTasksSchema,
  taskIdSchema,
  updateTaskSchema,
} = require("../validators/taskValidators");

const router = express.Router();

router.use(protect);

router.route("/").get(validate(getTasksSchema), getTasks).post(validate(createTaskSchema), createTask);
router.get("/stats", getTaskStats);
router.get("/trash", validate(getTasksSchema), getDeletedTasks);
router.post("/:id/restore", validate(taskIdSchema), restoreTask);
router
  .route("/:id")
  .get(validate(taskIdSchema), getTask)
  .put(validate(updateTaskSchema), updateTask)
  .delete(validate(taskIdSchema), deleteTask);

module.exports = router;
