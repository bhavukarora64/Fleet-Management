// routes/driver.js
const express = require('express');
const router = express.Router();

const driver = require('../controllers/driver');

router.get('/getAllDrivers', driver.getAllDrivers);
router.post('/createDriver', driver.createDriver);
router.delete('/deleteDriver/:id', driver.deleteDriver);
router.patch('/updateDriver/:id', driver.updateDriver);

module.exports = router;
