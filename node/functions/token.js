const jwt = require("jsonwebtoken");
require("dotenv").config()


function create(payload) {
    // payload = {mail, password}
    return jwt.sign(payload, process.env.MASTER_KEY);
}

function verify(token, mail) {
    try {
        const tst = jwt.verify(token, process.env.MASTER_KEY);
        // tst have {mail, password }
        console.log("tst :", tst);
        return tst.mail == mail;
    } catch (error) {

    }
    return false;

}

module.exports = { create, verify }