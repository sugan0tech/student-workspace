const mongo = require("mongoose");
require("dotenv").config();
const url = process.env.DB_URL;
const chalk = require("chalk");
mongo.connect(
    url,
).catch((reason) => {
    console.log(reason);
    console.log(chalk.red.inverse.bold("Error occurred in DB connection !!!"));
});
module.exports = mongo;