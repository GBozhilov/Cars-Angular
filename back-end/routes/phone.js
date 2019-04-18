const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');

const Phone = require('mongoose').model('Phone');
const Comment = require('mongoose').model('Comment');
const User = require('mongoose').model('User');

router.get('/all', async(req, res, next) => {
    const pageSize = 6
    let page = Number(req.query.page)
    let serach = req.query.serach || ''
    if (page < 1) {
        page = 1
    }
    let startIndex = (page - 1) * pageSize

    try {
        const phones = await Phone
            .find({
                "brand": {
                    $regex: new RegExp(`.*${serach}.*`, 'i')
                }
            }).sort({date: -1})
            .populate({
                path: 'comments',
                // Get friends of friends - populate the 'friends' array for every friend
                populate: {
                    path: 'creator',
                    select: "name"
                }
            })
            .skip(startIndex)
            .limit(pageSize)
        res.status(200).json({
            success: true,
            phones
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            message: error.message
        })
    }

});
router.get('/newPhones', async(req, res, next) => {  
    try {
        const phones = await Phone
            .find({}).sort({date: -1}).limit(3)

        
        res.status(200).json({
            success: true,
            phones
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: error.message
        })
    }

});
router.get('/count', async(req, res, next) => {
    let serach = req.query.serach || ''
    
    try {
        let count = await Phone.count({
            "brand": {
                $regex: new RegExp(`.*${serach}.*`, 'i')
            }})
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
})
router.get('/details/:id', async(req, res, next) => {
    let id = req.params.id

    try {
        let result = await Phone.findById(id).populate({
            path: 'comments',
            // Get friends of friends - populate the 'friends' array for every friend
            populate: {
                path: 'creator',
                select: "name"
            }
        })

        res.status(200).json({
            success: true,
            phone: result
        });
    } catch (error) {
        console.log('Phone not exist')

        res.status(202).json({
            success: false,
            message: 'Phone not exist',
        });
    }

});
router.post('/create/:userId', async(req, res, next) => {
    let phone = req.body
    let userId = req.params.userId
    let user = await User.findById(userId)
    
    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized')
        }
        let result = await Phone.create({
            brand: phone.brand,
            model: phone.model,
            imgUrl: phone.imgUrl,
            price: phone.price,
            date: Date.now(),
            description: phone.description
        })

        console.log('Phone saved')
        res.status(200).json({
            success: true,
            message: 'Phone saved successfuly.',
            phone: result
        });
    } catch (error) {
        console.log('Phone not saved')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }



});
router.post('/edit/:id/:userId', async(req, res, next) => {
    let phone = req.body
    let id = req.params.id
    let userId = req.params.userId
    let user = await User.findById(userId)

    try {
       if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized')
        }
        let result = await Phone.findByIdAndUpdate(id, {
            $set: phone
        })
        console.log('Phone edited')
        res.status(200).json({
            success: true,
            message: 'Phone edit successfuly.',
            phone: result
        });
    } catch (error) {
        console.log('Phone not edit')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }
});
router.get('/delete/:id/:userId', async(req, res, next) => {
    let id = req.params.id
    let userId = req.params.userId
    let user = await User.findById(userId)
    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized')
        }
        let result = await Phone.findByIdAndRemove(id)
        await Comment.find({phone: result._id}, {multi: true}).remove()
        console.log('Phone delete')
        res.status(200).json({
            success: true,
            message: 'Phone delete successfuly.',
            phone: result
        });
    } catch (error) {
        console.log('Phone not exist')

        res.status(202).json({
            success: false,
            message: 'Phone not exist',
        });
    }
});


module.exports = router;