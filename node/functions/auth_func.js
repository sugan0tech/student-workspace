const user = require("../models/user");
const hash = require("./hash").hash;
const chalk = require("chalk");

async function push(data) {
    try {
        const valid = await user.exists({ $and: [{ mail: data.mail }] });
        console.log(data);
        if (valid == null) {
            data.password = hash(data.password);
            const newUser = new user(data);
            await newUser.save();
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function (push)"));
    }
    return false;
}

async function check(userMail, userPassword) {

    try {
        const valid = await user.exists({ $and: [{ mail: userMail }, { password: hash(userPassword) }] });
        if (valid == null) {
            return false;
        }
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function (check)"));
    }
    return true;
}

async function update(data) {
    try {
        data.password = hash(data.password);
        data.changedAt = new Date;
        const updateUsr = await user.updateOne({ mail: data.mail }, data);
        console.log(updateUsr);
        console.log(chalk.green.bold("\n\t User updated successfully"));

    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function (update)"));

    }
}

module.exports = { push, check, update }