// routes/analyticsalerts.js
const express = require('express');
const router = express.Router();

const analyticsalerts = require('../controllers/analyticsalerts');

router.get('/', analyticsalerts.getAllAlerts);


module.exports = router;
