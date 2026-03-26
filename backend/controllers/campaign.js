const Campaign = require('../models/Campaign');

// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
exports.getCampaigns = async (req, res, next) => {
    try {
        const campaigns = await Campaign.find().populate('user', 'name email').populate('hospital', 'name');
        res.status(200).json({ success: true, count: campaigns.length, data: campaigns });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get single campaign
// @route   GET /api/campaigns/:id
// @access  Public
exports.getCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id).populate('user', 'name email').populate('hospital', 'name');
        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Mock AI logic for survival probability and urgency
const calculateAIInsights = (disease, stage, timeLeft, requiredAmount) => {
    let survivalProbability = 'High';
    let urgencyScore = 50;

    // Simplified mock logic
    if (stage === '4' || timeLeft < 10) {
        survivalProbability = 'Low';
        urgencyScore = 95;
    } else if (stage === '3' || timeLeft < 30) {
        survivalProbability = 'Medium';
        urgencyScore = 80;
    } else if (requiredAmount > 1000000) {
        urgencyScore = 70;
    }

    return { survivalProbability, urgencyScore };
};

// @desc    Create new campaign
// @route   POST /api/campaigns
// @access  Private
exports.createCampaign = async (req, res, next) => {
    req.body.user = req.user.id;

    // Apply AI calculations
    const { survivalProbability, urgencyScore } = calculateAIInsights(
        req.body.disease,
        req.body.stage,
        req.body.timeLeft,
        req.body.requiredAmount
    );

    req.body.survivalProbability = survivalProbability;
    req.body.urgencyScore = urgencyScore;

    try {
        const campaign = await Campaign.create(req.body);
        res.status(201).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Post update to campaign
// @route   POST /api/campaigns/:id/update
// @access  Private
exports.postUpdate = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        // Add update
        campaign.updates.unshift({
            text: req.body.text,
            image: req.body.image,
        });

        await campaign.save();

        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Doctor verification
// @route   PUT /api/campaigns/:id/verify
// @access  Private (Doctor only)
exports.verifyCampaign = async (req, res, next) => {
    try {
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) {
            return res.status(404).json({ success: false, message: 'Campaign not found' });
        }

        campaign.isVerified = true;
        campaign.verifiedBy = req.user.id;
        await campaign.save();

        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
