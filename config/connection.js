// Import the mongoose module to interact with MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB using the MONGODB_URI environment variable if it exists, otherwise use a local database URL
mongoose.connect(process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/socialnetwork');

// Export the mongoose connection object to be used elsewhere in the application
module.exports = mongoose.connection;