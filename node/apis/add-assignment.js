const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const token = require("../functions/token");
const func = require("../functions/auth_func");
/*request body object
    {
        assignment : {
        subject: 'chemistry',
        assignmentDetails: 'test',
        date: 'Fri Feb 25 2022 22:40:48 GMT+0530 (India Standard Time)',
        isCompleted: false,
        }
    }
     */

router
    .use(cookieParser())
    // .use(express.json())
    .use(express.urlencoded({ extended: true }));

router
    .route("/")
    .post((req, res) => {

        console.log(
            chalk.yellow.bold.inverse("\n    add-assignment post request    \n")
        );
        console.log(chalk.green("request api : "), req.body);
        console.log(chalk.green("request cookie :"), req.cookies);
        if (req.cookies.token != null) {
            /*returns js object 
            {
                valid: bool,
                payload: object,
                status: " "
            } */
            token.verify(req.cookies.token, req.cookies.email).then(
                (tokenVerificationData) => {
                    console.log(
                        chalk.bold.green.inverse("token verified status :"),
                        tokenVerificationData.valid
                    );
                    if (tokenVerificationData.valid) {
                        // updation of assignment on database
                        console.log(req.body.assignment);
                        func.assignmentSave(req.body.assignment).then(
                            (resolve) => {
                                func.addAssignment(resolve, tokenVerificationData.payload.email).then(
                                    (resolve2) => {
                                        console.log("resolve2", resolve2);
                                        res.status(200).send("assignment added successfully");
                                    },
                                    (e) => {
                                        console.log(e);
                                        console.log(chalk.red.inverse.bold("error occurred in assignment add "));
                                    }
                                );
                            }
                        );
                    } else {
                        res.clearCookie("token");
                        res.redirect(301, "/login");
                    }
                },
                (e) => {
                    console.log(e);
                }

            )
        }
    });


module.exports = router;