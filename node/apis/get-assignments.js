const express = require("express");
const route = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const token = require("../functions/token");

/**
 * request post with token cookie
 * response objects, as array:
 * [
    {
        "_id": obj id,
        "subject": String,
        "assignmentDetails": String,
        "date": date,
        "isCompleted": bool,
        "__v": 0
    },]
 */
route
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

route.route("/").post((req, res) => {
    console.log(
        chalk.yellow.bold.inverse("\n    get-assignment post request    \n")
    );
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
                    func
                        .getinfo(
                            tokenVerificationData.payload.email,
                            tokenVerificationData.payload.password
                        )
                        .then(
                            (resolve) => {
                                func.getAssignments(resolve.assignments).then(
                                    (data) => {
                                        res.send(data);
                                    },
                                    (e) => {
                                        console.log(e);
                                    }
                                );
                            },
                            (e) => {
                                console.log(e);
                            }
                        );
                } else {
                    res.status(401).send("un authorized access");
                }

            }
        )
    }
});

module.exports = route;