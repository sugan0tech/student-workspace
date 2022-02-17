const express = require("express");
const chalk = require("chalk");
const router = express.Router();
const cookieParser = require("cookie-parser");

router
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

router
    .route("/")
    .post((req, res) => {
        res.clearCookie("name");
        res.clearCookie("token");
        res.end();

    })

module.exports = router;