const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    campaign: {
        type: mongoose.Schema.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Donation', DonationSchema);
