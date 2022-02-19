const jwt = require("jsonwebtoken");
require("dotenv").config()


function create(userMail) {
    return jwt.sign(userMail, process.env.MASTER_KEY);
}

function verify(token, mail) {
    try {
        const tst = jwt.verify(token, process.env.MASTER_KEY);
        return tst == mail;
    } catch (error) {

    }
    return false;

}

module.exports = { create, verify }