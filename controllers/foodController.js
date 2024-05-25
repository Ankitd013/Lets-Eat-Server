const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const fs = require('fs'); // Require the 'fs' module
const path = require('path'); 

const { Food } = require('../models/foodModel');

// Utility function for error handling and response
const handleDatabaseError = (res, err) => {
    console.error(err);
    res.status(500).json({ error: err.message });
};

router.post('/', async (req, res) => {
    try {
        const insertData = new Food(req.body);
        const doc = await insertData.save();
        res.json(doc);
    } catch (err) {
        handleDatabaseError(res, err);
    }
});

router.get('/', async (req, res) => {
    try {
        const docs = await Food.find({});
        res.json(docs);
    } catch (err) {
        handleDatabaseError(res, err);
    }
});

router.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ message: `No record given with id : ${req.params.id}` });

    try {
        const doc = await Food.findById(req.params.id);
        if (!doc)
            return res.status(404).json({ message: `Food not found with ID: ${req.params.id}` });
        res.json(doc);
    } catch (err) {
        handleDatabaseError(res, err);
    }
});

router.put('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ message: `No record with given Id : ${req.params.id}` });

    try {
        const updateData = req.body;
        const doc = await Food.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        if (!doc)
            return res.status(404).json({ message: `Food not found with ID: ${req.params.id}` });
        res.json(doc);
    } catch (err) {
        handleDatabaseError(res, err);
    }
});

router.delete('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ message: `No records with given id : ${req.params.id}` });

    try {
        const doc = await Food.findByIdAndDelete(req.params.id);
        if (!doc)
            return res.status(404).json({ message: `Food not found with ID: ${req.params.id}` });
        res.json(doc);
    } catch (err) {
        handleDatabaseError(res, err);
    }
});

module.exports = router;
