const express = require('express');
const { getLedger } = require('../controllers/ledger');
const router = express.Router();

router.get('/', getLedger);

module.exports = router;
