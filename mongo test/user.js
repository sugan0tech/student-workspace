const { TopologyDescriptionChangedEvent } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: Number,
    dept: String,
    created_at: {
        type: Date,
        immutable: true,
        default: new Date,
    },
    updated_at: {
        type: Date,
        default: new Date,
    },
    associates: mongoose.SchemaTypes.ObjectId,
    assignments: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model("User", userSchema);