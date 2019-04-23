const crypto = require("crypto");

function generateSalt() {
    return crypto.randomBytes(128).toString("base64");
}

function hashPassword(password, salt) {
    return crypto.createHmac("sha256", salt).update(password).digest("hex");
}

module.exports = {generateSalt, hashPassword};
