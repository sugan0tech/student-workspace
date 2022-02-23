const express = require("express");
const app = express();
const home = require("./apis/routes/home");
const register = require("./apis/routes/register");
const login = require("./apis/routes/login");
const logout = require("./apis/routes/logout");
const update = require("./apis/routes/update");
const del = require("./apis/routes/delete");
const getInfo = require("./apis/get-assignment");
const chalk = require("chalk");
const mongoose = require("./db");
const cors = require("cors");
console.log(
  chalk.yellow("\n-----------------------------------------------------")
);
console.log(
  chalk.yellow("-----------------------------------------------------\n")
);
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// middlewares
//routes
app
  .use("/home", home)
  .use("/register", register)
  .use("/login", login)
  .use("/logout", logout)
  .use("/update", update)
  .use("/delete", del)
  .use("/api/getAssignments", getInfo);

// default page
app.get("/", (req, res) => {
  res.status(200).send("<h1>this is the default page</h1>");
});

app.listen(5000);
console.log(chalk.blue.bold("listening on port 5000"));
