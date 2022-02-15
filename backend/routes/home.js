const express = require("express");
const router = express.Router();
const token = require("../functions/token");
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
            console.log(" authorised");
            res.send("you are an authorised user");
        } else {
            console.log("not authorised");
            res.redirect("/login", 301);
        }
    })

module.exports = router;