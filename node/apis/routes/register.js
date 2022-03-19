const express = require("express");
const router = express.Router();
const func = require("../../functions/auth_func");
const chalk = require("chalk");
const tok = require("../../functions/token");

// middle wares
router
    .use((req, res, callback) => {
        console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date}\n`));
        callback();
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }));
router
    .route("/")
    .get((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    register get request    \n"));
        res.status(200).send("register page");
    })
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    register post request    \n"));
        console.log(chalk.green("request api : "), req.body);
        func.push(req.body).then(
            (value) => {
                if (value == true) {
                    console.log(chalk.bold.green("\n\t data updated successfully\n"));
                    res.cookie(
                        "token",
                        tok.create({
                            email: req.body.email,
                            password: req.body.password,
                        }), { maxAge: 30 * 24 * 60 * 60 * 1000 }
                    );
                    res.cookie("email", req.body.email, { maxAge: 30 * 24 * 60 * 60 * 1000 });
                    res.send("registered successfully");
                } else if (value == false) {
                    console.log(chalk.bold.red("\n\t user user already exists\n"));
                    res.send("user already exists ");
                } else if (value == null) {
                    res.send("Error occurred in connection, with db");
                }
            },
            (e) => {
                console.log(e);
                console.log(chalk.red.bold("\n\tError occurred in registration\n"), chalk.red.inverse.bold("\tlocation: ./router/register.js\n"));
            }
        );
    })

module.exports = router