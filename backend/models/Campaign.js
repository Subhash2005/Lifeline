const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    patientName: {
        type: String,
        required: [true, 'Please add patient name'],
    },
    disease: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
    },
    timeLeft: {
        type: Number, // in days
    },
    requiredAmount: {
        type: Number,
        required: true,
    },
    raisedAmount: {
        type: Number,
        default: 0,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verifiedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    isEmergency: {
        type: Boolean,
        default: false,
    },
    hospital: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hospital',
    },
    survivalProbability: {
        type: String, // High, Medium, Low
        default: 'High',
    },
    urgencyScore: {
        type: Number, // 0-100
        default: 50,
    },
    imageUrl: {
        type: String,
    },
    updates: [
        {
            text: String,
            image: String,
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    status: {
        type: String,
        enum: ['active', 'closed', 'completed'],
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
