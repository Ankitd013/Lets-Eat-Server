const express = require('express');
const router = express.Router();
const { Types: { ObjectId } } = require('mongoose');
const { Category } = require('../models/categoryModel');

// Using async/await for clean and readable asynchronous code
router.post('/', async (req, res) => {
    try {
        let insertData = new Category({
            categoryname: req.body.categoryname,
        });
        let doc = await insertData.save();
        res.send(doc);
    } catch (err) {
        res.status(500).send(err.message);
        console.error('Error saving data: ', err);
    }
});

router.get('/', async (req, res) => {
    try {
        let docs = await Category.find({});
        res.send(docs);
    } catch (err) {
        res.status(500).send(err.message);
        console.error('Error in Retrieving Category:', err);
    }
});

router.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record given with id: ${req.params.id}`);
    }

    try {
        let doc = await Category.findById(req.params.id);
        if (!doc) {
            return res.status(404).send('Category not found');
        }
        res.send(doc);
    } catch (err) {
        res.status(500).send(err.message);
        console.error('Error Retrieving Category Data:', err);
    }
});

router.put('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given Id: ${req.params.id}`);
    }

    try {
        let updateData = {
            categoryname: req.body.categoryname,
        };
        let doc = await Category.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
        if (!doc) {
            return res.status(404).send('Category not found');
        }
        res.send(doc);
    } catch (err) {
        res.status(500).send(err.message);
        console.error('Error in Category Update:', err);
    }
});

router.delete('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No records with given id: ${req.params.id}`);
    }

    try {
        let doc = await Category.findByIdAndDelete(req.params.id);
        if (!doc) {
            return res.status(404).send('Category not found');
        }
        res.send(doc);
    } catch (err) {
        res.status(500).send(err.message);
        console.error('Error in Category Deletion:', err);
    }
});


module.exports = router;
