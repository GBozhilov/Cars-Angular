const express = require('express');
const router = new express.Router();

const authCheck = require('../middleware/auth-check');
const roleCheck = require('../middleware/role-check');
const deleteCheck = require('../middleware/delete-check');

const Comment = require('mongoose').model('Comment');
const Phone = require('mongoose').model('Phone');
const User = require('mongoose').model('User');

router.post('/create/:id', async(req, res, next) => {
    let comment = req.body
    let userId = req.params.id
    let user = await User.findById(userId)
    try {
        if (!user) {
            throw new Error('Unauthorized')
        }
        
        let result = await Comment.create({
            text: comment.text,
            creator: userId,
            date: Date.now(),
            phone: comment.phoneId
        })
        await Phone.findByIdAndUpdate(
            result.phone, {
                $push: {
                    "comments": result._id
                }
            }, {
                safe: true,
                upsert: true
            }
        );

        console.log('Comment add')
        res.status(200).json({
            success: true,
            message: 'Successfully add comment.',
            phone: result
        });
    } catch (error) {
        console.log('Comment not add')

        res.status(202).json({
            success: false,
            message: error.message,
        });
    }



});

router.get('/all/:id', async(req, res, next) => {
    let id = req.params.id
    
    try {
        const comments = await Comment
            .find({phone: id}).sort({date: -1})
            .populate('creator')
        
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
router.get('/delete/:id/:userId', async(req, res, next) => {
    let id = req.params.id
    let userId = req.params.userId
    const user = await User.findById(userId);
    const currComment = await Comment.findById(id);
    try {
        console.log(user.roles.indexOf('Admin') <= -1)
        if (currComment.creator != userId ) {
            if (user.roles.indexOf('Admin') <= -1) {
                console.log('errr')
                throw new Error('Unauthorized')   
            }          
        }
        let comment = await Comment.findByIdAndRemove(id)
        let phone = await Phone.update(
            { _id: comment.phone }, 
            { $pull: { comments: comment._id } }, 
            { multi: true }
          )

        console.log('Comment delete')
        res.status(200).json({
            success: true,
            message: 'Comment delete successfuly.',
        });
    } catch (error) {
        console.log('Comment not exist')

        res.status(202).json({
            success: false,
            message: error.message,
            comment: comment
        });
    }
});


module.exports = router;