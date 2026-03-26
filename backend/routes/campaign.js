const express = require('express');
const { getCampaigns, getCampaign, createCampaign, postUpdate, verifyCampaign } = require('../controllers/campaign');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getCampaigns)
    .post(protect, createCampaign);

router.route('/:id')
    .get(getCampaign);

router.post('/:id/update', protect, postUpdate);
router.put('/:id/verify', protect, authorize('doctor', 'admin'), verifyCampaign);

module.exports = router;
