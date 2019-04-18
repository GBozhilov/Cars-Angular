const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
    brand: {type: mongoose.Schema.Types.String, required: true},
    model: {type: mongoose.Schema.Types.String, required: true},
    imgUrl: {type: mongoose.Schema.Types.String, required: true},
    price: {type: mongoose.Schema.Types.Number, required: true},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    description: { type: mongoose.Schema.Types.String },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
})

// userSchema.method({
//     authenticate: function (password) {
//         return encryption.generateHashedPassword(this.salt, password) === this.hashedPass
//     }   
// })

const Phone = mongoose.model('Phone', phoneSchema)

module.exports = Phone