const jwt = require("jsonwebtoken");
require("dotenv").config()


function create(userName) {
    return jwt.sign(userName, process.env.MASTER_KEY);
}

function verify(token, name) {
    try {
        const tst = jwt.verify(token, process.env.MASTER_KEY);
        return tst == name;
    } catch (error) {

    }
    return false;

}

module.exports = { create, verify }