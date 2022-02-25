const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true,
        default: "chemistry"
    },
    assignmentDetails: {
        type: String,
        required: true,
        default: "test"

    },
    date: {
        type: String,
        required: true,
        default: new Date()
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("assignment", assignmentSchema);