// controllers/logout.js
exports.logout = (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
    });

    res.clearCookie('connect.sid')
    res.json({ message: 'Logout successful' });
  };
  