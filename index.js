const express = require("express");
const app = express();
const login = require("./routes/login");
const register = require("./routes/register");
const update = require("./routes/update");
const chalk = require("chalk");
const mongoose = require("./db");
console.log(chalk.yellow("\n-----------------------------------------------------"));
console.log(chalk.yellow("-----------------------------------------------------\n"));

// middlewares
//routes
app
    .use("/login", login)
    .use("/register", register)
    .use("/update", update);

// default page
app.get("/", (req, res) => {
    res.status(200).send("<h1>this is the default page</h1>");
})

app.listen(5000);
console.log(chalk.blue.bold("listening on port 5000"));