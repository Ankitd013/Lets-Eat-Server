const express = require('express');
const router = express.Router();
const { Order } = require('../models/orderModel');

// POST endpoint to create a new order
router.post('/', async (req, res, next) => {
    try {
        const insertData = new Order({
            fname: req.body.fname,
            fdesc: req.body.fdesc,
            cname: req.body.cname,
            cemail: req.body.cemail,
            cphone : req.body.cphone,
            caddress : req.body.caddress,
            quan : req.body.quan,
            price : req.body.price,
            date : req.body.date,
        });

        const doc = await insertData.save();
        res.status(201).send(doc);  // Use appropriate status code for resource creation
    } catch (err) {
        console.error('Error saving data:', err);
        next(err);  // Pass errors to the Express error handler
    }
});
 
// GET endpoint to retrieve all orders
router.get('/', async (req, res, next) => {
    try {
        const docs = await Order.find();
        res.send(docs);
    } catch (err) {
        console.error('Error in Retrieving Food Detail:', err);
        next(err);  // Pass errors to the Express error handler
    }
});

module.exports = router;
