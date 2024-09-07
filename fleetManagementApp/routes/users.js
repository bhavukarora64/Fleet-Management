// routes/user.js
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to get the logged-in user's ID
router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        // User is authenticated, return the user ID
        return res.json({ userId: req.user.user_id });
    } else {
        // User is not authenticated
        return res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;
