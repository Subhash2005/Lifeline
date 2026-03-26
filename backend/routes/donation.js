const express = require('express');
const { createDonation, getMyDonations } = require('../controllers/donation');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
    .post(protect, createDonation);

router.get('/my', protect, getMyDonations);

module.exports = router;
