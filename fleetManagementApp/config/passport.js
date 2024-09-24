// config/passport.js
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcryptjs');
const connectToMySQL = require('../helperScripts/mysqlDB'); // Import MySQL connection function
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from uuid library
const fs = require('fs');
const path = require('path');

module.exports = function(passport) {
    // Local Strategy
    passport.use('local',
        new LocalStrategy({ usernameField: 'emailID' }, async (emailID, password, done) => {
            try {

                // Match user
                const [rows] = await connectToMySQL.query('SELECT * FROM UserInformation WHERE email_address = ?', [emailID]);
                if (rows.length === 0) {
                    return done(null, false, { message: 'No user found' });
                }
                const user = rows[0];

                // Get local auth details
                const [authRows] = await connectToMySQL.query('SELECT * FROM LocalAuth WHERE user_id = ?', [user.user_id]);
                if (authRows.length === 0) {
                    return done(null, false, { message: 'No authentication details found' });
                }
                const hashedPassword = authRows[0].password_hash;

                // Match password
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect' });
                    }
                });
            } catch (err) {
                console.error(err);
                return done(err);
            }
        })
    );

    // Google Strategy
    passport.use('google',
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_CODE,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'https://fleet-management-5eyg.vercel.app//login/auth/google/secrets',
            userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                 // Connect to MySQL

                // Check if user already exists
                const [rows] = await connectToMySQL.query('SELECT * FROM UserInformation WHERE email_address = ?', [profile.emails[0].value]);

                if (rows.length > 0) {
                    // User exists, fetch OAuth details if necessary
                    const user = rows[0];
                    const [oauthRows] = await connectToMySQL.query('SELECT * FROM OAuth WHERE user_id = ?', [user.user_id]);
                    if (oauthRows.length === 0) {
                        // Insert OAuth details if not present
                        await connectToMySQL.query('INSERT INTO OAuth (user_id, provider, oauth_identifier, oauth_token) VALUES (?, ?, ?, ?)', [
                            user.user_id,
                            'google',
                            profile.id,
                            accessToken
                        ]);
                    }
                    return done(null, user);
                } else {
                    const date = new Date();
                    const newUser = {
                        user_id: uuidv4(), // Generate a new UUID
                        username: profile.given_name + "_" + profile.family_name,
                        email_address: profile.emails[0].value,
                        registration_date: date
                    };

                    await connectToMySQL.query('INSERT INTO UserInformation SET ?', newUser);

                    // Insert OAuth details
                    await connectToMySQL.query('INSERT INTO OAuth (user_id, provider, oauth_identifier, oauth_token) VALUES (?, ?, ?, ?)', [
                        newUser.user_id,
                        'google',
                        profile.id,
                        accessToken
                    ]);

                    // Create a directory for the user
                    const userDirectoryPath = path.resolve('C:/Users/BhavukArora/Documents/Azure Repo/5g-masterarbeit/fleetManagementApp/listedCars', newUser.user_id);
                    fs.mkdir(userDirectoryPath, { recursive: true }, (err) => {
                        if (err) {
                            console.error('Error creating user directory:', err);
                            return done(err, false, { message: 'Server error creating user directory' });
                        }

                        // Set full access permissions (read, write, execute for everyone)
                        fs.chmod(userDirectoryPath, 0o777, (err) => {
                            if (err) {
                                console.error('Error setting permissions for user directory:', err);
                                return done(err, false, { message: 'Server error setting permissions for user directory' });
                            }
                        });
                    });


                    return done(null, newUser);
                }
            } catch (err) {
                console.error(err);
                return done(err, false);
            }
        })
    );

    // Serialize user
    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    });

    // Deserialize user
    passport.deserializeUser(async (id, done) => {
        try {
            
            const [rows] = await connectToMySQL.query('SELECT * FROM UserInformation WHERE user_id = ?', [id]);
            done(null, rows[0]);
        } catch (err) {
            done(err, null);
        }
    });
};
