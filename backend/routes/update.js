const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const { check, update } = require("../functions/auth_func");

//middle wares
router
    .use((req, res, callback) => {
        console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date}\n`));
        callback();
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }))


router
    .route("/")
    .get((req, res) => {
        res.send("gonna update");
    })
    .post((req, res) => {
        check(req.body.name, req.body.password).then(
            (value) => {
                if (value == false)
                    console.log(chalk.red.bold("\n\t Invalid user can't update"));
                else {
                    update(req.body);
                }
            },
            (e) => {
                console.log(chalk.red.bold(e));
            }
        )
        res.send("updated");
    })


module.exports = router;