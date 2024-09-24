// routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('http://localhost:3000/dashboard');
  } else {
    res.redirect('http://localhost:3000/login');
  }
});

router.get('/data', dashboardController.getVehiclePerformanceData);

module.exports = router;
