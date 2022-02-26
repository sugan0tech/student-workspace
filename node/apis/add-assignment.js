const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const tok = require("../functions/token");
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
    .use(express.json())
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
                payload: object
            } */
            const tokenVerificationData = tok.verify(req.cookies.token, req.cookies.email);
            console.log(
                chalk.bold.green.inverse("token verified status :"),
                tokenVerificationData.valid
            );
            if (tokenVerificationData.valid) {
                // updation of assignment on database
                func.assignmentSave(req.body.assignment).then(
                    (resolve) => {
                        func.addAssignment(resolve, tokenVerificationData.payload.email).then(
                            (resolve2) => {
                                console.log("resolve2", resolve2);
                                res.status(200).send("assignment added successfully");
                            },
                            (e) => {
                                console.log(e);
                                console.log(chalk.red.inverse.bold("error occured in assignment add "));
                            }
                        );
                    }
                );
            } else {
                res.clearCookie("token");
                res.redirect(301, "/login");
            }
        } else {

            res.redirect(301, "/login");
        }
    });

router
    .route("/updateStatus")
    .post((req, res) => {

    })

module.exports = router;