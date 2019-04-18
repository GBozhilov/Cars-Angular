const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {type: mongoose.Schema.Types.String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    phone: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Phone"},
})

commentSchema.virtual('getDate').get(function () {
    return new Date(this.date).toLocaleString()
 })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment