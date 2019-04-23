const jwt = require('jsonwebtoken');

const configuration = require("../configuration/configuration")["development"];
const User = require("../models/user");

module.exports = {
    isAuthenticated: (req, res, next) => {
        const authHeaders = req.get('Authorization');

        if (!authHeaders) {
            return res.status(401)
                .json({message: 'Not authenticated.'});
        }

        const token = req.get('Authorization').split(' ')[1];
        let decodedToken;

        try {
            decodedToken = jwt.verify(token, configuration.decodedToken);
        } catch (error) {
            return res.status(401)
                .json({message: 'Token is invalid.', error});
        }

        if (!decodedToken) {
            return res.status(401)
                .json({message: 'Not authenticated.'});
        }

        req.userId = decodedToken.userId;
        next();
    },
    isInRole: (role) => (req, res, next) => {
        User.findById(req.userId)
            .then(user => {
                if (user.roles.indexOf(role) > -1) {
                    next();
                } else {
                    return res.status(403).json({message: 'Not authorized.'});
                }
            })
            .catch(error => {
                return res.status(401).json({message: 'Not authenticated.'});
            });
    }
};
