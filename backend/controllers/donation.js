const Donation = require('../models/Donation');
const Campaign = require('../models/Campaign');
const Ledger = require('../models/Ledger');
const User = require('../models/User');
const crypto = require('crypto');

// @desc    Process a donation
// @route   POST /api/donations
// @access  Private
exports.createDonation = async (req, res, next) => {
    try {
        const { campaignId, amount } = req.body;

        const campaign = await Campaign.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        // Create transaction entry
        const donation = await Donation.create({
            user: req.user.id,
            campaign: campaignId,
            amount: Number(amount),
        });

        // Update campaign raised amount
        campaign.raisedAmount += Number(amount);
        if (campaign.raisedAmount >= campaign.requiredAmount) {
            campaign.status = 'completed';
        }
        await campaign.save();

        // Update User impact score and check badges
        const user = await User.findById(req.user.id);
        user.impactScore += Number(amount) / 10; // 1 score for every 10 units donated
        
        // Mock badge logic
        if (user.impactScore > 1000 && !user.badges.includes('Life Saver')) {
            user.badges.push('Life Saver');
        }
        if (user.impactScore > 5000 && !user.badges.includes('Emergency Hero')) {
            user.badges.push('Emergency Hero');
        }
        await user.save();

        // Add to Mock Blockchain Ledger
        const hash = crypto.createHash('sha256').update(`${donation._id}${Date.now()}`).digest('hex');
        await Ledger.create({
            donationId: `TXN-${donation._id.toString().slice(-6).toUpperCase()}`,
            campaign: campaignId,
            user: req.user.id,
            amount,
            hash,
        });

        res.status(201).json({ success: true, data: donation });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get donations for user
// @route   GET /api/donations/my
// @access  Private
exports.getMyDonations = async (req, res, next) => {
    try {
        const donations = await Donation.find({ user: req.user.id }).populate('campaign', 'title');
        res.status(200).json({ success: true, count: donations.length, data: donations });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
