const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['blood donor', 'caretaker', 'medicine donor', 'other'],
        required: true,
    },
    skills: [String],
    location: {
        type: String,
        required: true,
    },
    phone: String,
    status: {
        type: String,
        enum: ['available', 'unavailable'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
