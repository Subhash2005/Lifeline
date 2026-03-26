const express = require('express');
const { getVolunteers, registerVolunteer, updateVolunteer } = require('../controllers/volunteer');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
    .get(getVolunteers)
    .post(protect, registerVolunteer);

router.route('/:id')
    .put(protect, updateVolunteer);

module.exports = router;
