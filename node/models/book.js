const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    bookId: String,
    title: String,
    date: Date,
    images: [String],
    size: Number,
    pdf: [String]
})

module.exports = mongoose.model("books", bookSchema);