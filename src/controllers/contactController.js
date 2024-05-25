const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Contact= require('../models/contactModel'); // Assuming this is the correct path to your model

// Util function to handle errors and logging
function handleErrors(err, res, messagePrefix) {
    console.error(messagePrefix, err);
    res.status(500).send({ message: `${messagePrefix}${err.message}` });
}

module.exports = {
    post: async (req, res) => {
        try {
            let insertData = new Contact(req.body);
            let doc = await insertData.save();
            res.send(doc);
        } catch (err) {
            handleErrors(err, res, 'Error saving data: ');
        }
    },
    getcontact: async (req, res) => {
        try {
            let docs = await Contact.find({});
            res.send(docs);
        } catch (err) {
            handleErrors(err, res, 'Error in Retrieving Contact: ');
        }
    },
    getcontactid: async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record given with id: ${req.params.id}`);
        }

        try {
            let doc = await Contact.findById(req.params.id);
            if (!doc) {
                res.status(404).send(`Contact with id ${req.params.id} not found`);
            } else {
                res.send(doc);
            }
        } catch (err) {
            handleErrors(err, res, 'Error Retrieving Contact Data: ');
        }
    },
    put: async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No record with given Id: ${req.params.id}`);
        }

        try {
            let doc = await Contact.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            if (!doc) {
                res.status(404).send(`Contact with id ${req.params.id} not found`);
            } else {
                res.send(doc);
            }
        } catch (err) {
            handleErrors(err, res, 'Error in Updating Contact: ');
        }
    },
    delete: async (req, res) => {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).send(`No records with given id: ${req.params.id}`);
        }

        try {
            let doc = await Contact.findByIdAndDelete(req.params.id);
            if (!doc) {
                res.status(404).send(`Contact with id ${req.params.id} not found`);
            } else {
                res.send(doc);
            }
        } catch (err) {
            handleErrors(err, res, 'Error Deleting Contact: ');
        }
    }
};
