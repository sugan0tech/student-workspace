const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const tok = require("../functions/token");
const func = require("../functions/auth_func");
const assignment = require("../models/assignment");

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
        const verifiedStatus = tok.verify(req.cookies.token, req.cookies.email);
        console.log(
            chalk.bold.green.inverse("token verified status :"),
            verifiedStatus
        );
        if (verifiedStatus) {
            const data = tok.getPayload(req.cookies.token);
            func.getinfo(data.email, data.password).then(
                (resolve) => {
                    if (resolve != null) {
                        console.log(chalk.green.bold("\n\tuser info found\n"));
                        console.log(resolve);
                        res.send(resolve.assignments);
                    } else {
                        res.send("user infor can't be fetched");
                    }
                },
                (e) => {
                    console.log(
                        chalk.red.bold("\n\terror in get-assignments\n"),
                        chalk.red.bold.inverse("\tlocation: ./api/get-assignments\n")
                    );
                }
            );
        } else {
            res.status(401).send("invalid access");
        }
    });

module.exports = router;