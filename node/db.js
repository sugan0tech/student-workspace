const mongo = require("mongoose");
require("dotenv").config();
const url = process.env.DB_URL;
const chalk = require("chalk");
mongo.connect(
    url,
);
mongo.connection.once("open", () => {

    console.log(chalk.green.bold.inverse("Connected to the database"));
});

module.exports = mongo;