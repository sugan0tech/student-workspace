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
        console.log(chalk.yellow.bold.inverse("\n    get-exams post request    \n"));
        console.log(chalk.green("request api : "), req.body);
        console.log(chalk.green("request cookie :"), req.cookies);
        if (req.cookies.token != null) {
            /**
             *"examTime" : [
             *api sturucture :
             *{
             *    "_id" : ObjectId("6235604f154a8c4f024ef8fa"),
             *    "id" : "test exam id",
             *    "title" : "sem exams",
             *    "subs" : [
             *    	{
             *    		"_id" : ObjectId("6235604f154a8c4f024ef8fb"),
             *    		"subject" : "maths",
             *    		"date" : ISODate("2022-03-19T04:46:01.258Z")
             *    	},
             *    	{
             *    		"_id" : ObjectId("6235604f154a8c4f024ef8fc"),
             *    		"subject" : "chemistry",
             *    		"date" : ISODate("2022-03-19T04:46:01.258Z")
             *    	}
             *    ]
             *}
             *],
             *
             */
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
                            (data) => {
                                if (data != null) {
                                    console.log(chalk.green.bold("\n\tuser info found\n"))
                                    console.log(data);
                                    res.send(data.examTime);
                                } else {
                                    res.send("user info can't be fetched");
                                }
                            },
                            (e) => {
                                console.log(chalk.red.bold("\n\terror in get-exams\n"), chalk.red.bold.inverse("\tlocation: ./api/get-exams\n"));
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