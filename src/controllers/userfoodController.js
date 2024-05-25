const express = require('express');
const router = express.Router();
const { Types: { ObjectId } } = require('mongoose');

const { Food } = require('../models/foodModel');

router.get('/:category_id', async (req, res) => {
    const { category_id } = req.params;

    try {
        const foods = await Food.find({ category_id }).exec(); // Use await instead of callbacks
        res.json(foods); // Send response in JSON format
    } catch (err) {
        console.error('Error retrieving food items:', err.message);
        res.status(500).json({ message: 'Internal Server Error' }); // Send proper HTTP status code and message
    }
});

module.exports = router;
