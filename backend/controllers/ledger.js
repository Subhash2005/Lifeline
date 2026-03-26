const Ledger = require('../models/Ledger');

// @desc    Get all ledger entries
// @route   GET /api/ledger
// @access  Public
exports.getLedger = async (req, res, next) => {
    try {
        const ledger = await Ledger.find().populate('user', 'name').populate('campaign', 'title');
        res.status(200).json({ success: true, count: ledger.length, data: ledger });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
