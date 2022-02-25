const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const func = require("../../functions/auth_func");
const cookieParser = require("cookie-parser");

router
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

router
    .route("/")
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    Delete post request    \n"));
        func.del(req.body.email, req.body.password).then(
            (resolve) => {
                if (resolve) {
                    console.log(chalk.green.bold(`\n\tsuccessfully deleted user ${req.body.email}\n`));
                    res.clearCookie("token");
                    res.clearCookie("email");
                    res.send("successfully deleted");
                } else {
                    console.log("not deleted");
                }
            },
            (e) => {
                chalk.bold.red("\n\tError !!! in deletions \n");
                chalk.bold.red.inverse("\tlocation: ./apis/routes/delete\n")
            }

        );

    })

module.exports = router;