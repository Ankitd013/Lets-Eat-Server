const mongoose = require('mongoose');
const passport = require('passport');

// Assuming Reguser model has a schema that defines fullName, email, etc.
const Reguser= mongoose.model('Reguser');

module.exports.register1 = async (req, res, next) => {
    const { fullName, email, phone, address, password } = req.body;

    try {
        // Check for duplicate email before attempting to save a new user
        const doesExist = await Reguser.findOne({ email }).exec();
        if (doesExist) {
            return res.status(409).json({ error: 'Email address already registered.' });
        }

        // Create and save the new user to the database
        const reguser = await Reguser.create({ fullName, email, phone, address, password });
        res.status(201).json(reguser);
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

module.exports.authenticate1 = (req, res, next) => {
    passport.authenticate('local-ruser', (err, reguser, info) => {
        if (err) {
            console.error('Authentication error:', err.message);
            return res.status(400).json({ error: 'Authentication failed.' });
        }
        if (!reguser) {
            return res.status(404).json(info);
        }
        const token = reguser.generateJwt();
        res.status(200).json({ "token": token });
    })(req, res, next);
};

module.exports.get = async (req, res) => {
    try {
        const users = await Reguser.find().select('-password').exec();
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err.message);
        res.status(500).json({ error: 'Server error retrieving users.' });
    }
};

module.exports.reguserProfile1 = async (req, res) => {
    try {
        // Retrieve the user profile by ID, excluding password and including desired fields
        const userProfile = await Reguser.findById(req._id, 'fullName email phone -_id').exec();
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found.' });
        }
        res.json(userProfile);
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ error: 'Server error fetching user profile.' });
    }
};
