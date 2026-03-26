const Hospital = require('../models/Hospital');

// @desc    Get all hospitals
// @route   GET /api/hospitals
// @access  Public
exports.getHospitals = async (req, res, next) => {
    try {
        const hospitals = await Hospital.find();
        res.status(200).json({ success: true, count: hospitals.length, data: hospitals });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Add hospital
// @route   POST /api/hospitals
// @access  Private (Admin only)
exports.addHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.create(req.body);
        res.status(201).json({ success: true, data: hospital });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
