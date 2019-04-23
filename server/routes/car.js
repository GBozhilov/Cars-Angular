const router = require('express').Router();
const {body} = require('express-validator/check');

const userMiddleware = require("../middlewares/userMiddleware");
const carController = require('../controllers/car');

router.post('/create',
    [
        body('model')
            .trim()
            .isLength({min: 1})
            .withMessage('Car model is required!'),
        body('imageUrl')
            .trim()
            .isLength({min: 1})
            .withMessage('Car imageUrl is required!'),
        body('priceForDayRent')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car priceForDayRent must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car priceForDayRent need to be a number');
                }
            }),
        body('horsePower')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car horsePower must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car horsePower need to be a number');
                }
            }),
        body('fuelCapacity')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car fuelCapacity must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car fuelCapacity need to be a number');
                }
            }),
        body('kilometersTraveld')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car kilometersTraveled must be more then 0.1!');
                    }

                    return true;
                } else {
                    return Promise.reject('Car kilometersTraveled must be a number!');
                }
            })
    ], userMiddleware.isAuthenticated, userMiddleware.isInRole("Admin"), carController.create);

router.put("/edit/:id",
    [
        body('model')
            .trim()
            .isLength({min: 1})
            .withMessage('Car model is required.'),
        body('imageUrl')
            .trim()
            .isLength({min: 1})
            .withMessage('Car imageUrl is required.'),
        body('priceForDayRent')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car priceForDayRent must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car priceForDayRent must be a number');
                }
            }),
        body('horsePower')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car horsePower must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car horsePower must be a number');
                }
            }),
        body('fuelCapacity')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car fuelCapacity must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car fuelCapacity must be a number');
                }
            }),
        body('kilometersTraveld')
            .trim()
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseFloat(value)) && isFinite(value);

                if (isNumber) {
                    if (parseFloat(+value) < 0.1) {
                        return Promise.reject('Car kilometersTraveled must be more then 0.1');
                    }

                    return true;
                } else {
                    return Promise.reject('Car kilometersTraveled must be a number');
                }
            })
    ], userMiddleware.isAuthenticated, userMiddleware.isInRole("Admin"), carController.edit);

router.delete("/delete/:id", userMiddleware.isAuthenticated, userMiddleware.isInRole("Admin"), carController.delete);

router.get("/details/:id", carController.details);

router.get('/all', carController.getAll);

module.exports = router;
