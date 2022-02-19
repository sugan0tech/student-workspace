const express = require("express");
const app = express();
const home = require("./routes/home");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const update = require("./routes/update");
const del = require("./routes/delete");
const chalk = require("chalk");
const mongoose = require("./db");
console.log(chalk.yellow("\n-----------------------------------------------------"));
console.log(chalk.yellow("-----------------------------------------------------\n"));

// middlewares
//routes
app
    .use("/home", home)
    .use("/register", register)
    .use("/login", login)
    .use("/logout", logout)
    .use("/update", update)
    .use("/delete", del);

// default page
app.get("/", (req, res) => {
    res.status(200).send("<h1>this is the default page</h1>");
})

app.listen(5000);
console.log(chalk.blue.bold("listening on port 5000"));