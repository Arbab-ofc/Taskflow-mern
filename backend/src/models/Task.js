if (process.env.NODE_ENV === "test") {
  module.exports = require("./taskMemoryModel");
  return;
}

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "in-progress", "completed"],
        message: "Status must be pending, in-progress, or completed",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be low, medium, or high",
      },
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
    statusHistory: [
      {
        from: {
          type: String,
          enum: ["pending", "in-progress", "completed", null],
          default: null,
        },
        to: {
          type: String,
          enum: ["pending", "in-progress", "completed"],
          required: true,
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ status: 1, deletedAt: 1 });
taskSchema.index({ priority: 1, deletedAt: 1 });
taskSchema.index({ createdAt: -1, deletedAt: 1 });
taskSchema.index({ dueDate: 1, deletedAt: 1 });
taskSchema.index({ user: 1, deletedAt: 1, createdAt: -1 });
taskSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Task", taskSchema);
