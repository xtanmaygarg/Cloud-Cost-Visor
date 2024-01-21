const { insertIntoUsers, loginHelper } = require("../database/databaseHelper");
const { hashPassword } = require('../utils');

const register = async (req, res) => {
    const details = req.body;
    console.log("original", details.password);
    details.password = await hashPassword(details.password);
    console.log("hashed", details.password);

    insertIntoUsers(res, details);
};

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    return loginHelper(res, email, password);
}

module.exports = { register, login };
