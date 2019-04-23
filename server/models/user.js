const mongoose = require("mongoose");

const encryption = require("../utilities/encryption");

let userSchema = mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    isBlocked: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    rentedCars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }],
    roles: [{
        type: mongoose.Schema.Types.String
    }],
    salt: {
        type: String,
        required: true
    }
});


userSchema.method({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);

        let isSamePasswordHash = inputPasswordHash === this.password;

        return isSamePasswordHash;
    },
    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
