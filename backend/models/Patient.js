const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    mobile: {
        type: String,
        required: true,
        unique: true
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    doctor: {
      type: String,
      default: "General",
    },

    queueType: {
      type: String,
      enum: ["normal", "priority", "emergency"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["waiting", "current", "completed", "skipped"],
      default: "waiting",
    },
    calledAt: {
        type: Date,
        default: null,
    },
    completedAt: {
        type: Date,
        default: null
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Patient", patientSchema);