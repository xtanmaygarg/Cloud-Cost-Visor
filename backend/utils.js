const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// Password verification using bcrypt
const verifyPassword = async (passwordAttempt, hashedPassword) => {
    console.log({passwordAttempt, hashedPassword})
    const verified = await bcrypt.compare(passwordAttempt || "", hashedPassword || "")
    // return bcrypt.compare(passwordAttempt || "", hashedPassword || "");
    console.log({verified})
    return verified;
};

const createToken = (user) => {
    const token = jwt.sign(user, "AuthToken");

    return token;
};


module.exports = {
    hashPassword,
    verifyPassword,
    createToken
}