const chalk = require("chalk");
const jwt = require("jsonwebtoken");
require("dotenv").config()


function create(payload) {
    // payload = {mail, password}
    return jwt.sign(payload, process.env.MASTER_KEY);
}

// verify function 
// returns 
function verify(token, email) {
    try {
        const tokenPayload = jwt.verify(token, process.env.MASTER_KEY);
        // tst have {mail, password }
        return {
            valid: tokenPayload.email == email,
            payload: tokenPayload
        };
    } catch (e) {
        console.log(e)
        console.log(chalk.red.bold("\n\tError in verify func\n"), chalk.red.bold.inverse("\tlocation: ./functions/token\n"));

    }
    return {
        valid: false,
        payload: null,
    };

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