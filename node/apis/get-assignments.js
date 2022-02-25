const express = require("express");
const route = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const tok = require("../functions/token");

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
        const tokenVerificationData = tok.verify(req.cookies.token, req.cookies.email);
        console.log(
            chalk.bold.green.inverse("token verified status :"),
            tokenVerificationData.valid
        );
        console.log(tokenVerificationData)
        if (tokenVerificationData.valid) {
            func.getinfo(tokenVerificationData.payload.email, tokenVerificationData.payload.password).then(
                (resolve) => {
                    func.getAssignments(resolve.assignments).then(
                        (resolve) => {
                            res.send(resolve);
                        },
                        (e) => {
                            console.log(e)
                        }

                    );

                },
                (e) => {
                    console.log(e);
                }
            )
        } else {
            res.clearCookie("token");
            res.redirect(301, "/login");
        }
    }
});

module.exports = route;