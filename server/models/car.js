const mongoose = require("mongoose");

let carSchema = mongoose.Schema({
    model: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    horsePower: {
        type: mongoose.Schema.Types.Number
    },
    engineType: {
        type: mongoose.Schema.Types.String
    },
    fuelCapacity: {
        type: mongoose.Schema.Types.Number
    },
    transmission: {
        type: mongoose.Schema.Types.String
    },
    kilometersTraveld: {
        type: mongoose.Schema.Types.Number
    },
    description: {
        type: mongoose.Schema.Types.String
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    priceForDayRent: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    rentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isRented: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    counterRents: {
        type: mongoose.Schema.Types.Number,
        default: 0
    }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
