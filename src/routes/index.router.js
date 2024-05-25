const express = require('express');
const router = express.Router();

// Controllers
const ctrlUser = require('../controllers/user.controller');
const stuuser = require('../controllers/reguser.controller');
const contactform = require('../controllers/contactController');

// Middleware
const jwtHelper = require('../config/jwtHelper');

// Contact routes
router.route('/contact')
    .get(contactform.getcontact)
    .post(contactform.post);

router.route('/contact/:id')
    .get(contactform.getcontactid)
    .put(contactform.put)
    .delete(contactform.delete);

// Student user routes for Client
router.post('/register1', stuuser.register1);
router.post('/auth1', stuuser.authenticate1);
router.get('/reguserProfile', jwtHelper.verifyJwtToken, stuuser.reguserProfile1);

// User routes For admin
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;
