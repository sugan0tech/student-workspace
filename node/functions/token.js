const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config()


function create(payload) {
    // payload = {email, password}
    return jwt.sign(payload, process.env.MASTER_KEY);
}

// verify function 
// returns 
async function verify(token, email) {
    try {
        const tokenPayload = jwt.verify(token, process.env.MASTER_KEY);
        // tokenPayload have {email, password }
        const valid = await user.exists({
            email: tokenPayload.email
        });

        if (valid == null) {
            const data = {
                valid: false,
                payload: tokenPayload,
                err: "user doesn't exist"
            }

            console.log(chalk.green.inverse.bold("return data token verify :"), data)
            return data
        } else {
            const data = {
                valid: tokenPayload.email == email,
                payload: tokenPayload,
                status: "ok"
            }
            console.log(chalk.green.inverse.bold("return data token verify :"), data)
            return data

        }
    } catch (e) {
        console.log(e)
        console.log(chalk.red.bold("\n\tError in verify func\n"), chalk.red.bold.inverse("\tlocation: ./functions/token\n"));

    }
    const data = {
        valid: false,
        payload: null,
        status: "Error in token, Might be courrupted :("
    }
    console.log(chalk.green.inverse.bold("return data token verify :"), data)
    return data

}

module.exports = { create, verify }