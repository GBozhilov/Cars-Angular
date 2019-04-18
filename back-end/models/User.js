const mongoose = require('mongoose')
const encryption = require('../util/encryption')

const userSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String},
    hashedPass: {type: mongoose.Schema.Types.String, require: true},
    email: {type: mongoose.Schema.Types.String, require: true, unique: true },
    salt: {type: mongoose.Schema.Types.String, require: true},
    roles: [{ type: mongoose.Schema.Types.String }]
})

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    }   
})

userSchema.virtual('isAdmin').get(function () {
    return this.roles.indexOf('Admin') > -1
})

const User = mongoose.model('User', userSchema)

User.seedAdminUser = async () => {
    try {
        let users = await User.find()
        if (users.length > 0) {
            return
        }
        const salt = encryption.generateSalt()
        const hashedPass = encryption.generateHashedPassword(salt, 'Admin')      
        return User.create({
            name: 'Admin',
            salt,
            hashedPass,
            email: 'admin@admin.bg',
            roles: ['Admin']
        })
    } catch (e) {
       console.log(e) 
    }
}

module.exports = User