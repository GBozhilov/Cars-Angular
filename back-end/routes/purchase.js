const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');

const Phone = require('mongoose').model('Phone');
const Purchase = require('mongoose').model('Purchase');
const User = require('mongoose').model('User');

router.post('/create/:phoneId/:userId', async(req, res, next) => {
    let phoneId = req.params.phoneId
    let userId = req.params.userId
    try {
        let result = await Purchase.create({
            creator: userId,
            phone: phoneId,
            date: Date.now(),
        })

        console.log('Purchase add')
        res.status(200).json({
            success: true,
            message: 'Successfully add purchase.',
            purchase: result
        });
    } catch (error) {
        console.log('Purchase not add')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }



});
router.get('/status/:userId', async(req, res, next) => {
    let userId = req.params.userId
    let user = await User.findById(userId)
    if (user.roles.includes('Admin')) {
        let orderStatus = ['Accepted', 'In Progress', 'Shipped', 'Delivered', 'Completed']
        try {            
            let purchase = await Purchase.find({}).populate({ path: 'phone', select: 'brand model' }).sort({date: -1})

            
            purchase.forEach((p, i) => {
                let currStat = purchase[i].status
                purchase[i].status = [currStat, ...orderStatus.filter(p => p !== currStat)].join(',')
            });
            res.status(200).json({
                success: true,
                purchase: purchase
            });

        } catch (error) {
            res.status(201).json({
                success: false,
                message: error.message
            });
        }
    } else {

        try {
            let purchase = await Purchase.find({
                creator: userId
            }).populate('phone').populate({ path: 'phone', select: 'brand model' }).sort({date: -1})
            res.status(200).json({
                success: true,
                purchase: purchase
            });
        } catch (error) {
            res.status(201).json({
                success: false,
                message: error.message
            });
        }
    }
});
router.post('/status/:id/:userId', async(req, res, next) => {
    let id = req.params.id
    let userId = req.params.userId
    let user = await User.findById(userId)
   
    try {
        if (!user.roles.includes('Admin')) {
            throw new Error('Unauthorized')
        }
        await Purchase.findByIdAndUpdate(id, {status: req.body.status})

         res.status(200).json({
            success: true,
            message: 'Purchase are updated successfully'
        });
    } catch (error) {
        res.status(201).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/details/:id', async(req, res, next) => {
    let id = req.params.id
    try {
        let purchase = await Purchase.findById(id).populate('phone')
        res.status(200).json({
            success: true,
            purchase: purchase
        });
    } catch (error) {
        res.status(201).json({
            success: false,
            message: error.message
        });
    }
});



module.exports = router;