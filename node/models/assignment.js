const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
    },
    assignmentDetails: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("assignment", assignmentSchema);