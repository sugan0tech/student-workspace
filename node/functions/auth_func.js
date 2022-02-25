const user = require("../models/user");
const assignment = require("../models/assignment");
const hash = require("./hash").hash;
const chalk = require("chalk");

async function push(data) {
    try {
        const valid = await user.exists({ $and: [{ email: data.email }] });
        console.log(data);
        if (valid == null) {
            data.password = hash(data.password);
            const newUser = new user(data);
            const saveUser = await newUser.save();
            console.log(saveUser);
            return true;
        }
        return false;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (push)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );

    }
    return null;
}

async function check(userMail, userPassword) {
    try {
        const valid = await user.exists({
            $and: [{ email: userMail }, { password: hash(userPassword) }],
        });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (check)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return null;
}

async function update(data) {
    try {
        data.password = hash(data.password);
        data.changedAt = new Date();
        const updateUsr = await user.updateOne({ email: data.email }, data);
        console.log(updateUsr);
        console.log(chalk.green.bold("\n\t User updated successfully"));
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (update)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
}

async function del(userMail, userPassword) {
    try {
        const valid = await user.deleteOne({
            $and: [{ email: userMail }, { password: hash(userPassword) }],
        });
        if (valid == null) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (check)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return null;
}

async function getinfo(userMail, userPassword) {
    try {
        const val = await user.findOne({
            email: userMail,
            password: hash(userPassword)
        });
        console.log("val", val);
        return val
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in auth function (getinfo)\n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
    return false;
}

async function assignmentSave(data) {
    try {
        const newAssignment = new assignment(data);
        const saveAssignment = await newAssignment.save();
        console.log(saveAssignment);
        return saveAssignment._id;
    } catch (e) {
        console.log(e)
        console.log(
            chalk.bold.red("\n\tError !!! in assignmentSave function \n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
        return false
    }
}

async function addAssignment(objId, email) {
    try {
        const usrData = await user.findOne({ email: email });
        usrData.changedAt = new Date();
        const arr = usrData.assignments;
        arr.push(objId);
        usrData.assignments = arr;
        console.log("usrData :", usrData);
        const updateUsr = await user.updateOne({ email: email }, usrData);
        console.log("updateUsr", updateUsr);
        return true;

    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in addAssignment function \n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );

    }
    return false;
}

async function getAssignment(objId) {
    try {
        return await assignment.findById(objId);
    } catch (e) {
        console.log(e);
        console.log(
            chalk.bold.red("\n\tError !!! in getAssignment function \n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );

    }
    return null;
}
async function getAssignments(objIdArr) {
    try {
        var objArr = []
        for (const i of objIdArr) {
            objArr.push(await getAssignment(i));
        }
        return objArr

    } catch (e) {
        console.log(e)
        console.log(
            chalk.bold.red("\n\tError !!! in getAssignments function \n"),
            chalk.bold.red.inverse("\tlocation: ./functions/auth_function.js\n")
        );
    }
}
module.exports = { push, check, update, del, getinfo, assignmentSave, addAssignment, getAssignments };