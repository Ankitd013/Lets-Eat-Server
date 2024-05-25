const express = require('express');
const cors = require('cors');
const passport = require('passport');

// Configurations and database connections
require('./db/foodorderdb');
require('./config/passportConfig');

// Controller modules
const rtsIndex = require('./routes/index.router');
const categoryController = require('./controllers/categoryController.js');
const foodController = require('./controllers/foodController.js');
const picController = require('./controllers/picController.js');
const userfood = require('./controllers/userfoodController.js');
const orderController = require('./controllers/orderController.js');
const viewuserController = require('./controllers/viewuserController.js');
const userorder = require('./controllers/userOrderController.js');
const path = require('path');

// Setup upload directory path
const publicDir = path.join(__dirname, '/uploads');

const app = express();

// Application middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:4200','http://localhost:54330','http://lets-eat.com','http://lets-eat.clawiz.com']
}));
app.use(passport.initialize());

// Global error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        const valErrors = Object.keys(err.errors).map(key => err.errors[key].message);
        res.status(422).send(valErrors);
    } else {
        console.error(err);
        next(err); // Forward to the default Express error handler
    }
});

// Set port and listen for requests
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

// Define routes
app.use('/api', rtsIndex);
app.use('/categories',categoryController);
app.use('/foods',foodController);
app.use('/pics',picController);
app.use('/userfood', userfood);
app.use('/order',orderController);
app.use('/viewuser',viewuserController);
app.use('/userorder',userorder);
app.use(express.static(publicDir));
