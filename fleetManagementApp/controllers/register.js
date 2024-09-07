// controllers/register.js
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const connectToMySQL = require('../helperScripts/mysqlDB'); // Import the MySQL connection
const fs = require('fs');
const path = require('path');

exports.userRegistration = async (req, res) => {
    const { username, emailID, password, confirmPassword } = req.body;
    let errors = [];

    if (!emailID || !username || !password || !confirmPassword) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    if (password !== confirmPassword) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 8) {
        errors.push({ msg: 'Password should be at least 8 characters' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    } else {
        try {
            // connectToMySQL = await connectToMySQL(); // Get MySQL connection

            // Check if the email already exists
            const [userRows] = await connectToMySQL.query('SELECT * FROM UserInformation WHERE email_address = ?', [emailID]);
            if (userRows.length > 0) {
                errors.push({ msg: 'Email is already registered' });
                return res.status(400).json({ errors });
            }

            // Check if the username already exists
            const [usernameRows] = await connectToMySQL.query('SELECT * FROM UserInformation WHERE username = ?', [username]);
            if (usernameRows.length > 0) {
                errors.push({ msg: 'Username is already taken' });
                return res.status(400).json({ errors });
            }

            const date = new Date();

            // Create a new user
            const newUserId = uuidv4();
            const costFactor = parseInt(process.env.COST_FACTOR || '10');
            const hashedPassword = await bcrypt.hash(password, costFactor);

            // Insert into UserInformation
            await connectToMySQL.query('INSERT INTO UserInformation (user_id, username, email_address, registration_date) VALUES (?, ?, ?, ?)', [
                newUserId,
                username,
                emailID,
                date
            ]);

            // Insert into LocalAuth
            await connectToMySQL.query('INSERT INTO LocalAuth (user_id, password_hash) VALUES (?, ?)', [
                newUserId,
                hashedPassword
            ]);

            // Create a directory for the user
            const userDirectoryPath = path.resolve('C:/Users/BhavukArora/Documents/Azure Repo/5g-masterarbeit/fleetManagementApp/listedCars', newUserId);
            fs.mkdir(userDirectoryPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating user directory:', err);
                    return res.status(500).json({ errors: [{ msg: 'Server error creating user directory' }] });
                }

                // Set full access permissions (read, write, execute for everyone)
                fs.chmod(userDirectoryPath, 0o777, (err) => {
                    if (err) {
                        console.error('Error setting permissions for user directory:', err);
                        return res.status(500).json({ errors: [{ msg: 'Server error setting permissions for user directory' }] });
                    }
                });
            });

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ errors: [{ msg: 'Server error' }] });
        } finally {
            if (connectToMySQL) {
                await connectToMySQL.end(); // Close the MySQL connection
            }
        }
    }
};
