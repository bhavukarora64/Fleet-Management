// routes/statistics.js
const express = require('express');
const router = express.Router();

const statistics = require('../controllers/statistics');

router.get('/', statistics.getAllStatistics);

module.exports = router;
