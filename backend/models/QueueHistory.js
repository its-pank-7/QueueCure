const mongoose = require("mongoose");

const queueHistorySchema =
new mongoose.Schema({

    date: String,

    patients: Array,

    totalPatients: Number,

    completed: Number,

    skipped: Number

});

module.exports =
mongoose.model(
    "QueueHistory",
    queueHistorySchema
);