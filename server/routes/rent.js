const router = require('express').Router();
const {body} = require('express-validator/check');

const userMiddleware = require("../middlewares/userMiddleware");
const rentController = require('../controllers/rent');

router.post('/create/:id',
    [
        body('days')
            .custom((value, {req}) => {
                const isNumber = !isNaN(parseInt(value)) && isFinite(value);
                if (isNumber) {
                    if (parseInt(value) < 1) {
                        return Promise.reject('Rent days must be be a positive number!');
                    }

                    return true;
                } else {
                    return Promise.reject('Rent days need to be a number');
                }
            })
    ], userMiddleware.isAuthenticated, rentController.create);

router.delete("/delete/:id", userMiddleware.isAuthenticated, rentController.delete);

router.get('/mine', userMiddleware.isAuthenticated, rentController.getMine);

module.exports = router;
