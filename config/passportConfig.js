const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Define User and Ruser as Models using const
const User = mongoose.model('User');
const Ruser = mongoose.model('Reguser');

// Common strategy callback that can be reused
async function verifyCallback(email, password, done) {
    try {
        // The Model will be bound using .bind(thisArg)
        const user = await this.findOne({ email }).exec();

        if (!user) {
            return done(null, false, { message: 'Invalid email or password.' });
        }

        const isMatch = await user.verifyPassword(password);

        if (!isMatch) {
            return done(null, false, { message: 'Invalid email or password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

// Common strategy implementation as a function
// Common strategy implementation creating a strategy given a model name and a modelName for debug purpose
function createStrategy(Model, modelName) {
    return new LocalStrategy({ usernameField: 'email' }, verifyCallback.bind(Model));
}

// Using the common function to create strategies for User and Ruser models
passport.use('local-user', createStrategy(User, 'User'));
passport.use('local-ruser', createStrategy(Ruser, 'Ruser'));
