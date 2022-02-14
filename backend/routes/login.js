const express = require("express");
const router = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");

router.use((req, res, callback) => {
    console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date}\n`));
    callback();
})
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.route("/")
    .get((req, res) => {
        res.send("<h1>login page<h1>");
    })
    .post((req, res) => {
        console.log(chalk.green("reqest api : "), req.body);
        func.check(req.body.name, req.body.password).then(
            (value) => {
                if (value == false) {
                    console.log(chalk.bold.red("\n\t user not found \n"));
                    res.send("user not found");
                } else {
                    console.log(chalk.bold.green.inverse("\n\t user found \n"));
                    res.send("user found");
                }
            },
            (err) => {
                console.log(chalk.red.bold.inverse("error occured"));
                res.send("error occured in login");
            }
        );
    })

module.exports = router