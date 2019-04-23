const {validationResult} = require('express-validator/check');

const Rent = require('../models/rent');
const User = require('../models/user');
const Car = require('../models/car');

function validateRent(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        });

        return false;
    }

    return true;
}

module.exports = {
    create: async (req, res, next) => {
        if (validateRent(req, res)) {
            try {
                const {days} = req.body;
                const userId = req.userId;
                const carId = req.params.id;

                const newRent = {
                    days,
                    user: userId,
                    car: carId
                };

                const rent = await Rent.create(newRent);

                const user = await User.findById(userId);
                user.rentedCars.push(carId);
                await user.save();

                const car = await Car.findById(carId);
                car.rentedBy = userId;
                car.isRented = true;
                car.counterRents = car.counterRents + 1;
                car.save();

                res.status(201).json({message: 'You successfully rent this car!', rent});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    delete: async (req, res, next) => {
        if (validateRent(req, res)) {
            try {
                const rentId = req.params.id;

                const rent = await Rent.findById(rentId);
                const userId = rent.user.toHexString();
                const carId = rent.car.toHexString();

                const user = await User.findById(userId);
                if (userId !== req.userId) {
                    const error = new Error('You are not a current user.');
                    error.statusCode = 401;
                    throw error;
                }

                user.rentedCars.pull(carId);
                await user.save();

                const car = await Car.findById(carId);
                car.kilometersTraveld = car.kilometersTraveld + (100 * rent.days);
                car.rentedBy = undefined;
                car.isRented = false;
                await car.save();

                await rent.remove();

                res.status(200).json({message: 'Car is returned!'});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    getMine: async (req, res, next) => {
        try {
            const rents = await Rent.find({user: req.userId}).populate("car");

            res.status(200).json(rents);
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }
};
