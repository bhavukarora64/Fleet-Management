// routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const loginController = require('../Controllers/login');


// Local login route
router.post('/', loginController.localLogin);

// Google OAuth login route
router.get('/auth/google', loginController.googleLogin);

// Google OAuth callback route
router.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  loginController.googleCallback
);

module.exports = router;
