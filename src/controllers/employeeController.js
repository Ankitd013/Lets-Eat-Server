const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Employee }= require('../models/employeeModel');

// A helper function to handle errors
const sendError = (res, error, message = 'Error') => {
    console.error(message, error);
    res.status(500).send({ message: `${message}: ${error.message}` });
};

router.get('/emp/', async (req, res) => {
    try {
        const docs = await Employee.find({});
        res.send(docs);
    } catch (err) {
        sendError(res, err, 'Error retrieving employees');
    }
});

router.get('/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: `Invalid ID: ${req.params.id}` });

    try {
        const doc = await Employee.findById(req.params.id);
        if (!doc)
            return res.status(404).send({ message: `Employee not found with ID: ${req.params.id}` });
        res.send(doc);
    } catch (err) {
        sendError(res, err, 'Error retrieving employee by ID');
    }
});

router.post('/emp/', async (req, res) => {
    const emp = new Employee(req.body);
    try {
        const doc = await emp.save();
        res.send(doc);
    } catch (err) {
        sendError(res, err, 'Error saving employee');
    }
});

router.put('/emp/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: `Invalid ID: ${req.params.id}` });

    try {
        const doc = await Employee.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!doc)
            return res.status(404).send({ message: `Employee not found with ID: ${req.params.id}` });
        res.send(doc);
    } catch (err) {
        sendError(res, err, 'Error updating employee');
    }
});

router.delete('/emp/:id', async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: `Invalid ID: ${req.params.id}` });

    try {
        const doc = await Employee.findByIdAndDelete(req.params.id);
        if (!doc)
            return res.status(404).send({ message: `Employee not found with ID: ${req.params.id}` });
        res.send(doc);
    } catch (err) {
        sendError(res, err, 'Error deleting employee');
    }
});

module.exports = router;
