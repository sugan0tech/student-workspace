const express = require("express");
const router = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const tok = require("../functions/token");
require('dotenv').config()

router
    .use((req, res, callback) => {
        console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date}\n`));
        callback();
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())

router
    .route("/")
    .get((req, res) => {
        res.send("login page");
    })
    .post((req, res) => {
        console.log(chalk.green("reqest api : "), req.body);
        console.log(req.cookies);
        const verifiedStatus = tok.verify(req.cookies.token, req.body.name);
        console.log(chalk.bold.green.inverse("token verified status :"), verifiedStatus);
        if (verifiedStatus) {
            res.redirect(301, "/home");
        } else {
            func.check(req.body.name, req.body.password).then(
                (value) => {
                    if (value == false) {
                        console.log(chalk.bold.red("\n\t user not found \n"));
                        res.send("user not found");
                    } else {
                        console.log(chalk.bold.green.inverse("\n\t user found \n"));
                        res.cookie("token", tok.create(req.body.name), { maxAge: 30 * 24 * 60 * 60 * 1000 });
                        res.cookie("name", req.body.name, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                        res.send("user found");
                    }
                },
                (err) => {
                    console.log(chalk.red.bold.inverse("error occurred"));
                    res.send("error occurred in login");
                }
            );
        }
    })

module.exports = router