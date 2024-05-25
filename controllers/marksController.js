const { Marks }= require('../models/marksModel');
const express = require('express');

const router = express.Router();

// Use async handler for improved error handling with try-catch
router.get('/getmarks', async (req, res) => {
    try {
        const marks = await Marks.find();
        res.send(marks);
    } catch (err) {
        // Improved error response to client and log the error on server
        console.error(err);
        res.status(500).send('An error occurred while retrieving the marks.');
    }
});

module.exports = router;
