const {validationResult} = require('express-validator/check');

const User = require("../models/user");
const Car = require("../models/car");
const Rent = require("../models/rent");

function validateCar(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });

        return false;
    }

    return true;
}

module.exports = {
    create: async (req, res, next) => {
        if (validateCar(req, res)) {
            try {
                const {
                    model,
                    horsePower,
                    engineType,
                    fuelCapacity,
                    transmission,
                    kilometersTraveld,
                    description,
                    imageUrl,
                    priceForDayRent
                } = req.body;

                const newCar = {
                    model,
                    horsePower: +horsePower,
                    engineType,
                    fuelCapacity: +fuelCapacity,
                    transmission,
                    kilometersTraveld: +kilometersTraveld,
                    description,
                    imageUrl,
                    priceForDayRent: +priceForDayRent
                };

                const car = await Car.create(newCar);

                res.status(201).json({message: 'Car Created', car});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    edit: async (req, res, next) => {
        if (validateCar(req, res)) {
            try {
                const carId = req.params.id;
                const currentCar = await Car.findById(carId);

                const {
                    model,
                    horsePower,
                    engineType,
                    fuelCapacity,
                    transmission,
                    kilometersTraveld,
                    description,
                    imageUrl,
                    priceForDayRent
                } = req.body;

                const editCar = {
                    model,
                    horsePower: +horsePower,
                    engineType,
                    fuelCapacity: +fuelCapacity,
                    transmission,
                    kilometersTraveld: +kilometersTraveld,
                    description,
                    imageUrl,
                    priceForDayRent: +priceForDayRent
                };

                await Car.findByIdAndUpdate(carId, editCar);

                const newCar = await Car.findById(carId);

                res.status(200).json({message: 'Car Updated', car: newCar});

            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    delete: async (req, res, next) => {
        if (validateCar(req, res)) {
            try {
                const carId = req.params.id;

                const car = await Car.findById(carId);

                if (car.isRented) {
                    const userId = car.rentedBy.toHexString();
                    const user = await User.findById(userId);
                    user.rentedCars.pull(carId);
                    await user.save();

                    const rent = await Rent.findOne({carId: carId});
                    await Rent.findByIdAndDelete(rent._id);
                }

                await Car.findByIdAndDelete(carId);
                res.status(200).json({message: `Car Deleted`});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    details: async (req, res, next) => {
        try {
            const carId = req.params.id;

            const car = await Car.findById(carId).populate('rentedBy');

            res.status(200).json({message: `Car is found`, car});
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const cars = await Car.find().populate('rentedBy');

            res.status(200).json(cars);
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }
};
