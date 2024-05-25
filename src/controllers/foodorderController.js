const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { Orders }= require('../models/orderModel');
const { RegUsers } = require('../models/regusersModel');
const { Categories } = require('../models/categoriesModel');
const { Foods } = require('../models/foodsModel');

const handleErrors = (res, error) => {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
};

// Define a reusable function for finding documents by ID
const findByIdGeneric = async (model, id, res) => {
    if (!ObjectId.isValid(id)) {
        return res.status(400).send(`No record with given id: ${id}`);
    }
    
    try {
        const document = await model.findById(id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.send(document);
    } catch (error) {
        handleErrors(res, error);
    }
};

const createRoutesForModel = (model, modelName) => {
    // Generic GET route to fetch all documents
    router.get(`/${modelName}`, async (req, res) => {
        try {
            const docs = await model.find({});
            res.send(docs);
        } catch (error) {
            handleErrors(res, error);
        }
    });

    // Generic GET by ID route
    router.get(`/${modelName}/:id`, async (req, res) => {
        await findByIdGeneric(model, req.params.id, res);
    });

    // Generic POST route
    router.post(`/${modelName}`, async (req, res) => {
        try {
            const newDocument = new model(req.body);
            const doc = await newDocument.save();
            res.send(doc);
        } catch (error) {
            handleErrors(res, error);
        }
    });

    // Generic PUT route
    router.put(`/${modelName}/:id`, async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given id: ${req.params.id}`);
        }

        try {
            const doc = await model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            if (!doc) {
                return res.status(404).send('Document not found');
            }
            res.send(doc);
        } catch (error) {
            handleErrors(res, error);
        }
    });

    // Generic DELETE route
    router.delete(`/${modelName}/:id`, async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given id: ${req.params.id}`);
        }

        try {
            const doc = await model.findByIdAndDelete(req.params.id);
            if (!doc) {
                return res.status(404).send('Document not found');
            }
            res.send(doc);
        } catch (error) {
            handleErrors(res, error);
        }
    });
};

// Create routes for each model
createRoutesForModel(Orders, 'orders');
createRoutesForModel(RegUsers, 'regusers');
createRoutesForModel(Categories, 'categories');
createRoutesForModel(Foods, 'foods');

module.exports = router;
