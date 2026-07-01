const { z } = require("zod");

const objectId = z.string().regex(/^[a-f\d]{24}$/i, "Invalid task ID");
const status = z.enum(["pending", "in-progress", "completed"]);
const priority = z.enum(["low", "medium", "high"]);
const sort = z.enum(["newest", "oldest", "dueDate", "priority"]).default("newest");
const optionalDate = z
  .union([
    z.literal(""),
    z.null(),
    z
      .string()
      .refine((value) => !Number.isNaN(new Date(value).getTime()), "Due date must be valid"),
  ])
  .optional();

const paginationQuery = {
  search: z.string().trim().optional(),
  status: status.optional(),
  priority: priority.optional(),
  sort,
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(9),
};

const getTasksSchema = z.object({
  query: z.object(paginationQuery).strict(),
});

const taskIdSchema = z.object({
  params: z.object({ id: objectId }).strict(),
});

const createTaskSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(3, "Title must be at least 3 characters"),
      description: z.string().trim().min(10, "Description must be at least 10 characters"),
      status: status.default("pending"),
      priority: priority.default("medium"),
      dueDate: optionalDate,
    })
    .strict(),
});

const updateTaskSchema = z.object({
  params: z.object({ id: objectId }).strict(),
  body: z
    .object({
      title: z.string().trim().min(3, "Title must be at least 3 characters").optional(),
      description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .optional(),
      status: status.optional(),
      priority: priority.optional(),
      dueDate: optionalDate,
    })
    .strict()
    .refine((body) => Object.keys(body).length > 0, "At least one field is required"),
});

module.exports = {
  getTasksSchema,
  taskIdSchema,
  createTaskSchema,
  updateTaskSchema,
};
