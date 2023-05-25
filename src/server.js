'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const errorHandler = require('../src/error-handlers/500.js');
const notFound = require('../src/error-handlers/404.js');
const authRoutes = require('../src/auth/routes.js');
const routes = require('../src/routes/routes.js');
// Prepare the express app
const app = express();

// App Level Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
app.use(authRoutes); // Mount authentication routes
app.use('/api/v2', routes); // Mount other API routes under '/api/v2' path

// Catchalls
app.use('*', notFound); // Handle 404 Not Found errors
app.use(errorHandler); // Handle 500 Internal Server Error

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
