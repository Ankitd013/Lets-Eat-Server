const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Reguser = mongoose.model('Reguser');

router.get('/', async (req, res) => {
    try {
        const users = await Reguser.find().select('-password -saltSecret').exec(); // Use exec for a true Promise interface
        res.json(users);
    } catch (err) {
        console.error(`Error in Retrieving User Details: ${err.message}`);
        res.status(500).json({ message: 'Internal Server Error' }); // Send appropriate status code and error message
    }
});

module.exports = router;
