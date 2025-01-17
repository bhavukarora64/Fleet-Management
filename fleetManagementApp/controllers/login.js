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
  
  if (req.user && req.user.user_id) {
    const userId = req.user.user_id;
    console.log('userId in login oauth:', userId)
    res.redirect(`https://fleet-management-5eyg.vercel.app/dashboard?userId=${userId}`);
  } else {
    console.error('Error: req.user is undefined or does not contain user_id.');
    res.redirect('https://fleet-management-5eyg.vercel.app/login'); // Redirect back to login or show an error page
  }
};
