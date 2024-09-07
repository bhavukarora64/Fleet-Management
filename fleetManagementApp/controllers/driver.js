// controllers/driver.js
const Driver = require('../models/driver.js');

exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDriver = async (req, res) => {
    const driver = new Driver({
        driver_id: req.body.driver_id,
        name: req.body.name,
        license_number: req.body.license_number,
        contact_info: req.body.contact_info,
        other_details: req.body.other_details
    });

    try {
        const newDriver = await driver.save();
        res.status(201).json(newDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }
        await driver.deleteOne({ _id: req.params.id });
        res.json({ message: 'Driver deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);
        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        if (req.body.driver_id != null) {
            driver.driver_id = req.body.driver_id;
        }
        if (req.body.name != null) {
            driver.name = req.body.name;
        }
        if (req.body.license_number != null) {
            driver.license_number = req.body.license_number;
        }
        if (req.body.contact_info != null) {
            driver.contact_info = req.body.contact_info;
        }
        if (req.body.other_details != null) {
            driver.other_details = req.body.other_details;
        }

        const updatedDriver = await driver.save();
        res.json(updatedDriver);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
