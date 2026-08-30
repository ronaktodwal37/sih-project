const express = require('express');
const router = express.Router();
const { getGovernmentAnalytics } = require('../controllers/analyticsController');

router.get('/government', getGovernmentAnalytics);

module.exports = router;
