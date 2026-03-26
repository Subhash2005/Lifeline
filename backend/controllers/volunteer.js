const Volunteer = require('../models/Volunteer');

// @desc    Get all volunteers
// @route   GET /api/volunteers
// @access  Public
exports.getVolunteers = async (req, res, next) => {
    try {
        const volunteers = await Volunteer.find().populate('user', 'name email');
        res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create volunteer registration
// @route   POST /api/volunteers
// @access  Private
exports.registerVolunteer = async (req, res, next) => {
    req.body.user = req.user.id;

    try {
        const volunteer = await Volunteer.create(req.body);
        res.status(201).json({ success: true, data: volunteer });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteers/:id
// @access  Private
exports.updateVolunteer = async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!volunteer) {
            return res.status(404).json({ success: false, message: 'Volunteer profile not found' });
        }

        res.status(200).json({ success: true, data: volunteer });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
