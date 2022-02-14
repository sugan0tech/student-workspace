const user = require("../models/user");
const hash = require("./hash").hash;
const chalk = require("chalk");

async function push(data) {
    try {
        const valid = await user.exists({ $and: [{ name: data.name }] });
        console.log(data);
        if (valid == null) {
            data.password = hash(data.password);
            const newUser = new user(data);
            await newUser.save();
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function"));
    }
    return false;
}

async function check(userName, userPassword) {

    try {
        const valid = await user.exists({ $and: [{ name: userName }, { password: hash(userPassword) }] });
        if (valid == null) {
            return false;
        }
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function"));
    }
    return true;
}

async function update(data) {
    try {
        data.password = hash(data.password);
        data.changedAt = new Date;
        const updateUsr = await user.updateOne({ name: data.name }, data);
        console.log(updateUsr);
        console.log(chalk.green.bold("\n\t User updated successfully"));

    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red.inverse("Error !!! in auth function"));

    }
}

module.exports = { push, check, update }