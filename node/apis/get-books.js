const express = require("express");
const route = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const token = require("../functions/token");

route
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

route
    .route("/")
    .post((req, res) => {
        console.log(chalk.yellow.bold.inverse("\n    get-books post request    \n"));
        console.log(chalk.green("request api : "), req.body);
        console.log(chalk.green("request cookie :"), req.cookies);
        if (req.cookies.token != null) {
            /*returns js object 
            {
                valid: bool,
                payload: object,
                err: "error status with db",
            } */
            token.verify(req.cookies.token, req.cookies.email).then(
                (tokenVerificationData) => {
                    console.log(
                        chalk.bold.green.inverse("token verified status :"),
                        tokenVerificationData.valid
                    );
                    if (tokenVerificationData.valid) {
                        const data = tokenVerificationData.payload;
                        func.getinfo(data.email, data.password).then(
                            (resolve) => {
                                if (resolve != null) {
                                    console.log(chalk.green.bold("\n\tuser info found\n"))
                                    console.log(resolve);
                                    res.send(resolve.books);
                                } else {
                                    res.send("user info can't be fetched");
                                }
                            },
                            (e) => {
                                console.log(chalk.red.bold("\n\terror in get-books\n"), chalk.red.bold.inverse("\tlocation: ./api/get-books\n"));
                            }
                        );
                    } else {
                        res.status(401).send("invalid access");
                    }

                }
            )

        }
    })

module.exports = route