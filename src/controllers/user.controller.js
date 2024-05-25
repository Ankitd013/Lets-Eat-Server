const mongoose = require('mongoose');
const passport = require('passport');
const User= mongoose.model('User');

module.exports.register = async (req, res, next) => {
    const { fullName, email, password, role } = req.body;

    try {
        // Optimize by using findOne with projection to minimize data read if the user exists.
        let userExists = await User.findOne({ email }, '_id').exec();
        if (userExists) {
            return res.status(409).json({ message: 'Email address already registered.' });
        }

        let newUser = new User({ fullName, email, password, role });
        let doc = await newUser.save();

        // Assuming we don’t need to return password details
        let result = doc.toObject();
        delete result.password;
        res.status(201).json(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: 'Validation error.', errors: err.errors });
        } else {
            console.error('Registration error:', err.message);
            res.status(500).json({ message: 'Internal server error during registration.' });
        }
    }
};

module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local-user', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err.message);
            return res.status(500).json({
                message: 'Server error during authentication.',
            });
        }
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed.'
            });
        }

        try {
            const token = user.generateJwt();
            res.status(200).json({ token });
        } catch (error) {
            console.error('JWT generation error:', error.message);
            res.status(500).json({
                message: 'Error generating JWT.'
            });
        }
    })(req, res, next);
};

module.exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req._id).select('fullName email -_id').exec();
        if (!user) {
            return res.status(404).json({ message: 'User profile not found.' });
        }
        res.json(user);
    } catch (err) {
        console.error('Profile retrieval error:', err.message);
        res.status(500).json({ message: 'Error fetching user profile.' });
    }
};
