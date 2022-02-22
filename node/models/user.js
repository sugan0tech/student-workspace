const mongo = require("mongoose");
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const userSchema = mongo.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: [validateEmail, "pease fill valid mail"],
        trim: true, // trims white spaces from right and left
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date,
        immutable: true
    },
    changedAt: {
        type: Date,
        default: new Date,
        immutable: false,
    },
    bookList: [mongo.SchemaTypes.ObjectId],

    assignmentsList: [mongo.SchemaTypes.ObjectId],
    examTime: [
        { id: String, title: String, subs: [{ subject: String, date: Date }] }
    ]

})

module.exports = mongo.model("User", userSchema)