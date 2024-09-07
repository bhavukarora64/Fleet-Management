// controllers/user.js
const UserModel = require('../models/users.js');

// Controller function to handle getting all drivers
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new UserModel({
        user_Id: req.body.user_Id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        date_Of_Birth: req.body.date_Of_Birth,
        contact_Info: req.body.contact_Info,
        other_details: req.body.other_details
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne({ _id: req.params.id });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.body.user_Id != null) {
            user.user_Id = req.body.user_Id;
        }
        if (req.body.firstName != null) {
            user.firstName = req.body.firstName;
        }
        if (req.body.lastName != null) {
            user.lastName = req.body.lastName;
        }
        if (req.body.date_Of_Birth != null) {
            user.date_Of_Birth = req.body.date_Of_Birth;
        }
        if (req.body.contact_Info != null) {
            user.contact_Info = req.body.contact_Info;
        }
        if (req.body.other_details != null) {
            user.other_details = req.body.other_details;
        }

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
