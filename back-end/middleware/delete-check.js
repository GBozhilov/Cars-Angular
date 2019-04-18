const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Comment = require('mongoose').model('Comment');


module.exports = async(req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    // decode the token using a secret key-phrase
    return jwt.verify(token, 's0m3 r4nd0m str1ng', async(err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            return res.status(401).end();
        }

        const userId = decoded.sub;
        const id = req.params.id
        try {
            const user = await User.findById(userId);
            const comment = await Comment.findById(id);
            if (comment.creator == userId || user.roles.indexOf('Admin') > -1) {
                req.user = user;

                return next();
            }
            return res.status(401).end();


        } catch (error) {
            return res.status(202).json({
                success: false,
                message: error.message,
            }).end();
        }


    });
};