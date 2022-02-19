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
        console.log(req.cookies);
        if (token.verify(req.cookies.token, req.cookies.mail)) {
            console.log(chalk.green.bold("\n\tVerified token, authorized\n"));
            res.send(`Welcome ${req.cookies.mail}`);
        } else {
            console.log(chalk.red.bold("\n\tFailed token, Redirected!!!\n"), chalk.red.bold.inverse("\tlocation: ./routes/home.js\n"));
            res.redirect(301, "/login");
        }
    })

module.exports = router;