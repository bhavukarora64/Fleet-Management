// Controller/login.js
const passport = require('passport');

// Local login controller
exports.localLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ message: 'Login successful', user });  // Send JSON response instead of redirect
    });
  })(req, res, next);
};

// Google OAuth login controller
exports.googleLogin = (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

// Google OAuth callback controller
exports.googleCallback = (req, res) => {
  res.redirect('https://fleet-management-hxmj.vercel.app//dashboard');  // Ensure this URL matches your frontend URL
};
