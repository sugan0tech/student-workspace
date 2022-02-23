const express = require("express");
const router = express.Router();
const func = require("../../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const tok = require("../../functions/token");
require("dotenv").config();

router
  .use((req, res, callback) => {
    console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date()}\n`));
    callback();
  })
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

router
  .route("/")
  .get((req, res) => {
    console.log(chalk.yellow.bold.inverse("\n    login get request    \n"));
    res.send("login page");
  })
  .post((req, res) => {
    console.log(chalk.yellow.bold.inverse("\n    login post request    \n"));
    console.log(chalk.green("request api : "), req.body);
    console.log(chalk.green("request cookie :"), req.cookies);
    const verifiedStatus = tok.verify(req.cookies.token, req.cookies.email);
    console.log(
      chalk.bold.green.inverse("token verified status :"),
      verifiedStatus
    );
    if (verifiedStatus) {
      const data = tok.getPayload(req.cookies.token);
      func.check(data.email, data.password).then(
        (resolve) => {
          if (resolve) {
            console.log(
              chalk.green.bold("\n\ttoken cross referenced with db\n")
            );
            res.redirect(301, "/home");
          } else {
            res.send("account not found");
            console.log(
              chalk.red.bold(
                "\n\ttoken cross referenced with db failed\n\tprobably account deleted\n"
              )
            );
          }
        },
        (e) => {
          console.log(
            chalk.red.bold("\n\terror occurred in token db validation\n"),
            chalk.red.bold.inverse("\tlocation: ./routes/login\n")
          );
        }
      );
    } else {
      func.check(req.body.email, req.body.password).then(
        (value) => {
          if (value == false) {
            console.log(chalk.bold.red("\n\t user not found \n"));
            res.send("user not found");
          } else {
            console.log(chalk.bold.green.inverse("\n\t user found \n"));
            res.cookie(
              "token",
              tok.create({
                email: req.body.email,
                password: req.body.password,
              }),
              { maxAge: 30 * 24 * 60 * 60 * 1000 }
            );
            res.cookie("email", req.body.email, {
              maxAge: 30 * 24 * 60 * 60 * 1000,
            });
            // need to add user name as a cookie fetched from db
            res.send("user found");
          }
        },
        (err) => {
          console.log(
            chalk.red.bold("\n\terror occurred\n"),
            chalk.red.bold.inverse("\tlocation: ./routes/login.js\n")
          );
          res.send("error occurred in login");
        }
      );
    }
  });

module.exports = router;
