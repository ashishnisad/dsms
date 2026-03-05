const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    danceStyle: {
      type: String,
      required: true,
    },
    schedule: {
      day: String,
      startTime: String,
      endTime: String,
    },
    capacity: {
      type: Number,
      default: 20,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);