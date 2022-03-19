const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const token = require("../../functions/token");
const cookieParser = require("cookie-parser");
const { check, update } = require("../../functions/auth_func");

//middle wares
router
    .use((req, res, callback) => {
        console.log(chalk.bold.yellow(`\n${req.url}@ ${new Date}\n`));
        callback();
    })
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());


router
    .route("/")
    .get((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    update get request    \n"));
        res.send("updation page");
    })
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    update post request    \n"));
        console.log(chalk.green("request api : "), req.body);
        console.log(chalk.green("request cookie :"), req.cookies);
        if (req.cookies.token != null) {
            /*returns js object 
            {
                valid: bool,
                payload: object
            } */
            token.verify(req.cookies.token, req.cookies.email).then(
                (tokenVerificationData) => {
                    console.log(
                        chalk.bold.green.inverse("token verified status :"),
                        tokenVerificationData.valid
                    );
                    if (tokenVerificationData.valid) {
                        check(req.body.email, req.body.password).then(
                            (value) => {
                                if (value) {
                                    update(req.body);
                                    res.send("updated");
                                } else {
                                    console.log(chalk.red.bold("\n\tInvalid user can't update (auth failed)"));
                                    res.send("updation failed");
                                }

                            },
                            (e) => {
                                console.log(e);
                                res.send("error in server");
                            }

                        )
                    } else {
                        // token verificain failed stage
                        res.clearCookie("token");
                        res.redirect(301, "/login");
                    }

                }
            )
        } else {
            // no cookie so redirected to login stage
            res.redirect(301, "/login");
        }
    })


module.exports = router;