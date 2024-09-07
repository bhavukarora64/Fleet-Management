const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logout'); // Adjust the path as necessary

// Logout route
router.post('/', logoutController.logout);

module.exports = router;
