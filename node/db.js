const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.DB_URL;
const chalk = require("chalk");
mongoose.connect(
  url,
  () => {
    console.log(chalk.green.bold.inverse("Connected to the database"));
  },
  (err) => {
    console.log(
      chalk.red.bold.inverse("Not Connected to Database err!! occurred")
    );
  }
);

module.exports = mongoose;
