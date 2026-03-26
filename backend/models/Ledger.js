const mongoose = require('mongoose');

const LedgerSchema = new mongoose.Schema({
    donationId: {
        type: String, // Simulate transaction ID
        required: true,
        unique: true,
    },
    campaign: {
        type: mongoose.Schema.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    hash: {
        type: String, // Mock hash for blockchain simulation
        required: true,
    },
});

module.exports = mongoose.model('Ledger', LedgerSchema);
