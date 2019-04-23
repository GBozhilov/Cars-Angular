const {validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const configuration = require("../configuration/configuration")["development"];
const encryption = require('../utilities/encryption');

function validateUser(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422).json({
            message: 'Validation Failed Entered Data Is Incorrect',
            errors: errors.array()
        });

        return false;
    }

    return true;
}

module.exports = {
    register: async (req, res, next) => {
        if (validateUser(req, res)) {
            try {
                const {email, password} = req.body;

                const salt = encryption.generateSalt();
                const hashedPassword = encryption.hashPassword(password, salt);

                const newUser = {
                    email,
                    password: hashedPassword,
                    salt,
                    roles: ["User"],
                    rentedCars: []
                };

                const user = await User.create(newUser);

                res.status(201).json({message: 'You Are Successfully Registered', userId: user.id});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(error);
            }
        }
    },
    login: async (req, res, next) => {
        if (validateUser(req, res)) {
            try {
                const {email} = req.body;

                const user = await User.findOne().where("email").equals(email);

                const token = jwt.sign({userId: user._id.toString()}, configuration.decodedToken, {expiresIn: '9h'});

                res.status(200).json({message: 'You Are Successfully Logged In', token, user});
            } catch (error) {
                if (!error.statusCode) {
                    error.statusCode = 500;
                }

                next(error);
            }
        }
    },
    getUser: async (req, res, next) => {
        try {
            const userId = req.userId;

            if (!userId) {
                const error = new Error('You Are Not A Current User');
                error.statusCode = 401;
                throw error;
            }

            const user = await User.findById(userId).populate('rentedCars');

            res.status(200).json({user});
        } catch (error) {
            if (!error.statusCode) {
                error.statusCode = 500;
            }

            next(error);
        }
    }
};
