const express = require("express");
const router = express.Router();
const func = require("../../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const token = require("../../functions/token");
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
        if (req.cookies.token != null) {
            /*returns js object 
            {
                valid: bool,
                payload: object,
                err: "error status with db",
            } */
            token.verify(req.cookies.token, req.cookies.email).then(
                (tokenVerificationData) => {
                    console.log(
                        chalk.bold.green.inverse("token verified status :"),
                        tokenVerificationData.valid
                    );
                    if (tokenVerificationData.valid) {
                        res.redirect(301, "/home");
                    } else {
                        res.clearCookie("token");
                        res.redirect(301, "/login");
                    }

                }
            )

        } else {
            func.check(req.body.email, req.body.password).then(
                (value) => {
                    if (value === false) {
                        console.log(chalk.bold.red("\n\t user not found \n"));
                        res.send("user not found");
                    } else {
                        console.log(chalk.bold.green.inverse("\n\t user found \n"));
                        res.cookie(
                            "token",
                            token.create({
                                email: req.body.email,
                                password: req.body.password,
                            }), { maxAge: 30 * 24 * 60 * 60 * 1000 }
                        );
                        res.cookie("email", req.body.email, {
                            maxAge: 30 * 24 * 60 * 60 * 1000,
                        });
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