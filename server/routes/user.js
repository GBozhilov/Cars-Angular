const router = require('express').Router();
const {body} = require('express-validator/check');

const userMiddleware = require("../middlewares/userMiddleware");
const userController = require('../controllers/user');
const User = require('../models/user');

router.post('/register',
    [
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) => {
                return User.findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email address already exists!');
                        }
                    })
            }),
        body('password')
            .trim()
            .isLength({min: 4})
            .withMessage('Password must be more then 4 symbols!'),
        body('repeatPassword')
            .trim()
            .custom((value, {req}) => {
                if (!value || !req.body.password || value !== req.body.password || value === "" || req.body.password === "") {
                    return Promise.reject('Repeat Password and Password fields must be equal.');
                } else {
                    return true;
                }
            })
    ], userController.register);

router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, {req}) => {
            return User.findOne({email: value})
                .then(userDoc => {
                    if (!userDoc) {
                        return Promise.reject('Invalid email or password!');
                    }
                })
        }),
    body('password')
        .custom((value, {req}) => {
            return User.findOne({email: req.body.email})
                .then(userDoc => {
                    if (userDoc) {
                        if (!userDoc.authenticate(value || "")) {
                            return Promise.reject('Invalid email or password!');
                        }
                    }
                })
        })
], userController.login);

router.get("/me", userMiddleware.isAuthenticated, userController.getUser);

module.exports = router;
