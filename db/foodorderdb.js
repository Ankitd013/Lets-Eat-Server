const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

// Import model definitions
require('../models/user.model');
require('../models/categoryModel');
require('../models/contactModel');
require('../models/foodModel');
require('../models/orderModel');
require('../models/reguser.model');

// Connect to MongoDB
(async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected...');
    
    // Set Mongoose configurations if needed 
    mongoose.set('autoIndex', true);

    // Other database initialization tasks...
  } catch (error) {
    console.error('MongoDB connection error:', error);

    // Handle the connection error (possibly retry or exit)
  }

  // No need to manually disconnect here; the connection should remain open
})();
