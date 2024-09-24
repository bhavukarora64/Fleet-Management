// routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('https://fleet-management-5eyg.vercel.app/dashboard');
  } else {
    res.redirect('https://fleet-management-5eyg.vercel.app/login');
  }
});

router.get('/data', dashboardController.getVehiclePerformanceData);

module.exports = router;
