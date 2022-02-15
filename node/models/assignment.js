const mongoose = require("mongoose");

const assignmentSchema = mongoose.schema({
    subject: String,
    assignmentDetails: String,
    date: Date,
    isCompleted: Boolean,
})

module.exports("assignment", assignmentSchema);