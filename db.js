const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/test";
const chalk = require("chalk");
mongoose.connect(url, () => {
    console.log(chalk.green.bold.inverse("Connected to the database"));
}, (err) => {
    console.log(chalk.red.bold.inverse("Not Connected to Database err!! occured"));
});

module.exports = mongoose;