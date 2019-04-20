const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');

const Car = require('mongoose').model('Car');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');

router.get('/all', async (req, res, next) => {
    const pageSize = 6;
    let page = Number(req.query.page);
    let search = req.query.search || '';

    if (page < 1) {
        page = 1
    }

    let startIndex = (page - 1) * pageSize;

    try {
        const cars = await Car
            .find({
                'brand': {
                    $regex: new RegExp(`.*${search}.*`, 'i')
                }
            }).sort({date: -1})
            .populate({
                path: 'comments',
                populate: {
                    path: 'creator',
                    select: 'name'
                }
            })
            .skip(startIndex)
            .limit(pageSize);
        res.status(200).json({
            success: true,
            cars: cars
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            message: error.message
        })
    }

});

router.get('/newCars', async (req, res, next) => {
    try {
        const cars = await Car.find({}).sort({date: -1}).limit(3);

        res.status(200).json({
            success: true,
            cars: cars
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }

});

router.get('/count', async (req, res, next) => {
    let search = req.query.search || '';

    try {
        let count = await Car.count({
            'brand': {
                $regex: new RegExp(`.*${search}.*`, 'i')
            }
        });
        res.status(200).json({
            success: true,
            count: count
        });
    } catch (error) {
        res.status(201).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/details/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        let car = await Car.findById(id).populate({
            path: 'comments',
            populate: {
                path: 'creator',
                select: 'name'
            }
        });

        res.status(200).json({
            success: true,
            car: car
        });
    } catch (error) {
        console.log('Car do not exist.');

        res.status(202).json({
            success: false,
            message: 'Car do not exist.',
        });
    }

});

router.post('/create/:userId', async (req, res, next) => {
    let car = req.body;
    let userId = req.params.userId;
    let user = await User.findById(userId);

    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized')
        }
        let result = await Car.create({
            brand: car.brand,
            model: car.model,
            imgUrl: car.imgUrl,
            price: car.price,
            date: Date.now(),
            description: car.description
        });

        console.log('Car saved.');
        res.status(200).json({
            success: true,
            message: 'Car saved successfully.',
            car: result
        });
    } catch (error) {
        console.log('Car did not saved.');

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }


});
router.post('/edit/:id/:userId', async (req, res, next) => {
    let car = req.body;
    let id = req.params.id;
    let userId = req.params.userId;
    let user = await User.findById(userId);

    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized');
        }
        let result = await Car.findByIdAndUpdate(id, {
            $set: car
        });
        console.log('Car edited.');
        res.status(200).json({
            success: true,
            message: 'Car edit successfully.',
            car: result
        });
    } catch (error) {
        console.log('Car did not change.')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/delete/:id/:userId', async (req, res, next) => {
    let id = req.params.id;
    let userId = req.params.userId;
    let user = await User.findById(userId);

    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized');
        }
        let car = await Car.findByIdAndRemove(id);
        await Comment.find({car: car._id}, {multi: true}).remove();
        console.log('Car deleted.');
        res.status(200).json({
            success: true,
            message: 'Car deleted successfully.',
            car: car
        });
    } catch (error) {
        console.log('Car did not exist.');

        res.status(202).json({
            success: false,
            message: 'Car did not exist.',
        });
    }
});

module.exports = router;
