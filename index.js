'use strict';

require('dotenv').config(); // Load environment variables from .env file
const app = require('./src/server.js'); // Import the Express server
const { db } = require('./src/models/index.js'); // Import the database instance

db.sync().then(() => { // Sync the database models and start the server
  app.start(process.env.PORT || 3002); // Start the server on the specified port or default to 3002
});
