const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const tok = require("../functions/token");
const cookieParser = require("cookie-parser");
const { check, update } = require("../functions/auth_func");

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
        res.send("updation page");
    })
    .post((req, res) => {
        console.log(chalk.green("request api : "), req.body);
        console.log(chalk.green("request cookie :"), req.cookies);
        const verifiedStatus = tok.verify(req.cookies.token, req.cookies.mail);
        console.log(chalk.bold.green.inverse("token verified status :"), verifiedStatus);
        if (verifiedStatus) {
            check(req.body.mail, req.body.password).then(
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
            res.redirect(301, "/login");
            console.log(chalk.red.bold("\n\tInvalid user can't update (cookie failed)\n"), chalk.red.bold.inverse("\tlocation: ./routes/update.js\n"));
        }
    })


module.exports = router;