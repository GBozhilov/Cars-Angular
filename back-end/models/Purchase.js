const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    creator: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    car: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Car'},
    date: {type: mongoose.Schema.Types.Date, default: Date.now()},
    status: {type: mongoose.Schema.Types.String, default: 'Accepted'}
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
