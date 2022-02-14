const express = require("express");
const router = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");

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
        res.status(200).send("<h1>register page<h1>");
    })
    .post((req, res) => {
        console.log(chalk.green("reqest api : "), req.body);
        func.push(req.body).then(
            (value) => {
                if (value)
                    console.log(chalk.bold.green("\n\t data updated successfully\n"));
                else
                    console.log(chalk.bold.red("\n\t user user already exists\n"));
            },
            (err) => {
                console.log(chalk.red.bold.inverse("Error occured in registration"));
            }
        );
        res.send("ok thank you");
    })

module.exports = router