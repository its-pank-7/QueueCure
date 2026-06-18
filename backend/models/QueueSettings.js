const mongoose = require("mongoose");

const queueSettingsSchema = new mongoose.Schema({
  avgConsultationTime: {
    type: Number,
    default: 5,
  },
});

module.exports = mongoose.model(
  "QueueSettings",
  queueSettingsSchema
);