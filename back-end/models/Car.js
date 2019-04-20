const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {type: mongoose.Schema.Types.String, required: true},
    model: {type: mongoose.Schema.Types.String, required: true},
    imgUrl: {type: mongoose.Schema.Types.String, required: true},
    price: {type: mongoose.Schema.Types.Number, required: true},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    description: {type: mongoose.Schema.Types.String},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
