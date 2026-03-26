const express = require('express');
const { getHospitals, addHospital } = require('../controllers/hospital');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getHospitals)
    .post(protect, authorize('admin'), addHospital);

module.exports = router;
