const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');
const deleteCheck = require('../middleware/delete-check');

const Comment = require('mongoose').model('Comment');
const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');

router.post('/create/:id', async (req, res, next) => {
    let comment = req.body;
    let userId = req.params.id;
    let user = await User.findById(userId);

    try {
        if (!user) {
            throw new Error('Unauthorized');
        }

        let result = await Comment.create({
            text: comment.text,
            creator: userId,
            date: Date.now(),
            car: comment.carId
        });

        await Car.findByIdAndUpdate(
            result.car, {
                $push: {
                    'comments': result._id
                }
            }, {
                safe: true,
                upsert: true
            }
        );

        console.log('Comment added.');
        res.status(200).json({
            success: true,
            message: 'Successfully add a comment.',
            car: result
        });
    } catch (error) {
        console.log('Comment did not add.');

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }


});

router.get('/all/:id', async (req, res, next) => {
    let id = req.params.id;

    try {
        const comments = await Comment
            .find({car: id}).sort({date: -1})
            .populate('creator');

        res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        res.status(200).json({
            success: true,
            message: error.message
        })
    }

});
router.get('/delete/:id/:userId', async (req, res, next) => {
    let id = req.params.id;
    let userId = req.params.userId;
    const user = await User.findById(userId);
    const currComment = await Comment.findById(id);

    try {
        if (currComment.creator != userId) {
            if (user.roles.indexOf('Admin') <= -1) {
                throw new Error('Unauthorized');
            }
        }

        let comment = await Comment.findByIdAndRemove(id);
        let car = await Car.update(
            {_id: comment.car},
            {$pull: {comments: comment._id}},
            {multi: true}
        );

        console.log('Comment deleted.');
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully.',
        });
    } catch (error) {
        console.log('Comment did not exist');

        res.status(202).json({
            success: false,
            message: error.message,
            comment: comment
        });
    }
});


module.exports = router;
