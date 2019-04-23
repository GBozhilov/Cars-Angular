const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/user');
const Car = require('../models/car');

const encryption = require("../utilities/encryption");

function initializeDatabase(configuration) {
    mongoose.connect(configuration.dbConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const database = mongoose.connection;

    database.once('open', err => {
        if (err) {
            throw err;
        }

        seedDatabase()
            .then(() => {
                console.log('Database ready.');
            })
            .catch((reason) => {
                console.log('Something went wrong.');
                console.log(reason);
            });
    });

    database.on('error', reason => {
        console.log(reason);
    });
}

module.exports = initializeDatabase;

async function seedDatabase() {
    const hasUsers = await User.find().then((users) => users.length > 0);
    const hasCars = await Car.find().then((cars) => cars.length > 0);

    if (hasUsers === false) {
        await seedUsers();
    }

    if (hasCars === false) {
        await seedCars();
    }
}

async function seedUsers() {
    // Seed admin
    const saltAdmin = encryption.generateSalt();
    const passwordHashAdmin = encryption.hashPassword("123456", saltAdmin);

    const admin = {
        salt: saltAdmin,
        password: passwordHashAdmin,
        email: "admin@gmail.com",
        roles: ["Admin"],
        rentedCars: [],
        isBlocked: false
    };

    await User.create(admin);
}

async function seedCars() {
    const benz = {
        model: "Mercedes E class",
        horsePower: 308,
        engineType: "Diesel",
        fuelCapacity: 70,
        transmission: "Automatic",
        kilometersTraveld: 400,
        description: "Amazing and fas car.",
        imageUrl: "https://imgd.aeplcdn.com/1056x594/cw/ec/22875/MercedesBenz-EClass-Exterior-119150.jpg?wm=0&q=80",
        priceForDayRent: 100,
        counterRents: 0
    };
    const mercedes = {
        model: "Mercedes-Benz E 350 ",
        horsePower: 265,
        engineType: "Diesel",
        fuelCapacity: 70,
        transmission: "Automatic",
        kilometersTraveld: 10000,
        description: "Very good car",
        imageUrl: "https://1.bp.blogspot.com/-99J6QSjLVpE/WNIW7-4IJ4I/AAAAAAAAiAk/MuEn2nJ-J_wHmSu5nfhifegvcz_e__BcgCLcB/s1600/2014-mercedes-w212-facelift-e350-4matik-all-black-1.jpg",
        priceForDayRent: 50,
        counterRents: 0
    };

    const cars = [benz, mercedes];

    await Car.insertMany(cars);
}
