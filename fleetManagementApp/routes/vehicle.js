// routes/vehicle.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle');

// Route to register a new vehicle
router.post('/register', vehicleController.registerVehicle);
router.get('/getvehicles', vehicleController.getUserVehicles);
router.get('/getvehicleData', vehicleController.getvehcileData);
router.get('/getVehiclePerformanceMetrics', vehicleController.getVehiclePerformanceMetrics);

module.exports = router;
