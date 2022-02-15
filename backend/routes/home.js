const express = require("express");
const router = express.Router();
const token = require("../functions/token");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");

// middlewares
router
    .use(cookieParser())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

router
    .route('/')
    .get((req, res) => {
        console.log(req.body);
        if (token.verify(req.cookies.token, req.cookies.name)) {
            console.log(chalk.green.bold("Verified token, authorized"));
            res.send(`Welcome ${req.cookies.name}`);
        } else {
            console.log(chalk.red.bold("Failed token, Redirected!!!"));
            res.redirect("/login", 301);
        }
    })

module.exports = router;