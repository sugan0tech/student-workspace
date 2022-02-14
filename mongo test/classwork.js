const mongo = require("mongoose");
const schema = mongo.Schema({
    subject: String,
    pending_assignments: Number,
    assigned_date: Date,
    due_date: Date,
    submission_date: Date,
    ref: String,
    group: String,
    student_class: mongo.SchemaTypes.ObjectId
})

module.exports = mongo.model("classwork", schema);