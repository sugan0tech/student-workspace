const chalk = require("chalk");
const jwt = require("jsonwebtoken");
require("dotenv").config()


function create(payload) {
    // payload = {mail, password}
    return jwt.sign(payload, process.env.MASTER_KEY);
}

function verify(token, email) {
    try {
        const tst = jwt.verify(token, process.env.MASTER_KEY);
        // tst have {mail, password }
        console.log("tst :", tst);
        return tst.email == email;
    } catch (error) {

    }
    return false;

}

function getPayload(token) {
    try {
        return jwt.verify(token, process.env.MASTER_KEY);
    } catch (e) {
        console.log(e);
        console.log(chalk.red.bold("\n\tError in Payload func\n"), chalk.red.bold.inverse("\tlocation: ./functions/token\n"));
    }
    return {};

}

module.exports = { create, verify, getPayload }