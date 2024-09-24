// routes/session.js

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to get session details
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('inside the sessio management app')
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

module.exports = router;
