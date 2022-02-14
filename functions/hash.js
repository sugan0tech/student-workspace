const crypto = require("crypto");

function hash(password) {
    return crypto.createHash('md5').update(password).digest("hex");
}

module.exports = { hash };