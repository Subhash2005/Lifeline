const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    treatmentCost: {
        type: Map, // { "Cancer": 5000, "Heart": 3000 }
        of: Number,
        default: {},
    },
    availableBeds: {
        type: Number,
        default: 0,
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    imageUrl: String,
    rating: {
        type: Number,
        default: 4.5,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Hospital', HospitalSchema);
