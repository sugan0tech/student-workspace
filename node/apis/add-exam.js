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
                        test = {
                            examTime: [{
                                id: "test exam id",
                                title: "sem exams",
                                subs: [{
                                        subject: "maths",
                                        date: new Date(),
                                    },
                                    {
                                        subject: "chemistry",
                                        date: new Date(),
                                    }
                                ]
                            }],
                        }
                        func.update(data.email, test).then(
                            (bool) => {
                                if (bool)
                                    console.log(chalk.green.bold.inverse("Exam added successfully"));
                                else
                                    console.log(chalk.red.bold.inverse("failed adding exam"));
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