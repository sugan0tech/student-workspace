const mongoose = require("mongoose");

const assignmentSchema = mongoose.schema({
    subject: {
        type: String,
        required: true
    },
    assignmentDetails: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
        default: new Date
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports("assignment", assignmentSchema);