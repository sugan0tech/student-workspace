const express = require("express");
const route = express.Router();
const func = require("../functions/auth_func");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const tok = require("../functions/token");

/**
 * request post with token cookie
 * response objects, as array:
 * [
    {
        "_id": obj id,
        "subject": String,
        "assignmentDetails": String,
        "date": date`,
        "isCompleted": bool,
        "__v": 0
    },]
 */
route
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

route.route("/").post((req, res) => {
<<<<<<< HEAD
  console.log(
    chalk.yellow.bold.inverse("\n    get-assignment post request    \n")
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
          console.log(resolve.assignments);
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
=======
    console.log(
        chalk.yellow.bold.inverse("\n    get-assignment post request    \n")
>>>>>>> d0d8244324a2924843d2e8ef70978f3f8830bc2e
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