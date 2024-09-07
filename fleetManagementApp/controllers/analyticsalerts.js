// controllers/analyticsalerts.js
const alert = require('../models/activityAlerts');

exports.getAllAlerts = async (req, res) => {
    try {
        const alerts = await alert.find();
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};