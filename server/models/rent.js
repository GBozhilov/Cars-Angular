const mongoose = require("mongoose");

let rentSchema = mongoose.Schema({
    days: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    }
});

const Rent = mongoose.model("Rent", rentSchema);

module.exports = Rent;
