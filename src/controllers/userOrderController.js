const express = require('express');
const router = express.Router();
const { Order } = require('../models/orderModel');

// Helper function to validate email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

router.get('/:email', async (req, res) => {
    const { email } = req.params;

    // Validate cemail as a proper email
    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid Email Format' });
    }

    try {
        const orders = await Order.find({ cemail : email }).exec();
        res.json(orders);
    } catch (err) {
        console.error('Error retrieving orders:', err.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
