const user = require("../models/user");
const hash = require("./hash").hash;
const chalk = require("chalk");

async function push(data) {
    try {
        const valid = await user.exists({ $and: [{ email: data.email }] });
        console.log(data);
        if (valid == null) {
            data.password = hash(data.password);
            const newUser = new user(data);
            await newUser.save();
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red("\n\tError !!! in auth function (push)\n"), chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n"));;
    }
    return null;
}

async function check(userMail, userPassword) {

    try {
        const valid = await user.exists({ $and: [{ email: userMail }, { password: hash(userPassword) }] });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red("\n\tError !!! in auth function (check)\n"), chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n"));;
    }
    return null;
}

async function update(data) {
    try {
        data.password = hash(data.password);
        data.changedAt = new Date;
        const updateUsr = await user.updateOne({ email: data.email }, data);
        console.log(updateUsr);
        console.log(chalk.green.bold("\n\t User updated successfully"));

    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red("\n\tError !!! in auth function (update)\n"), chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n"));;

    }
}

async function del(userMail, userPassword) {

    try {
        const valid = await user.deleteOne({ $and: [{ email: userMail }, { password: hash(userPassword) }] });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(chalk.bold.red("\n\tError !!! in auth function (check)\n"), chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n"));;
    }
    return null;
}

module.exports = { push, check, update, del }