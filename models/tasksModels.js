const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null },
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
