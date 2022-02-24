const express = require("express");
const router = express.Router();
const chalk = require('chalk');
const func = require("../../functions/auth_func");
const tok = require("../../functions/token");
const cookieParser = require("cookie-parser");

router
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

router
    .route("/")
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    Delete post request    \n"));
        func.check(req.body.email, req.body.password).then(
            (resolve) => {
                if (resolve) {
                    func.del(req.body.email, req.body.password).then(
                        (resolve2) => {
                            if (resolve2) {
                                console.log(chalk.green.bold(`\n\tsuccessfully deleted user ${req.body.email}\n`));
                                res.send("successfully deleted");
                            } else {
                                console.log("not deleted");
                            }
                        },
                        (e) => {
                            console.log("error occurred");
                        }

                    );

                } else if (resolve == false) {
                    console.log("User not found")
                    res.send("user not found")

                }

            },
            (e) => {
                console.log(e);
                console.log(chalk.red.bold("\n\terror occurred in deletion"));
            }

        )

    })

module.exports = router;