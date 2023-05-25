'use strict';

const { users } = require('../../models/index');

module.exports = async (req, res, next) => {

  try {
    // Checking if the Authorization header is present
    if (!req.headers.authorization) { 
      _authError(); // If not present, invoke the _authError() function to handle authentication error
    }

    // Extracting the token from the Authorization header
    const token = req.headers.authorization.split(' ').pop();

    // Authenticating the user with the provided token
    const validUser = await users.authenticateToken(token);

    // Setting the authenticated user and token in the request object for further processing
    req.user = validUser;
    req.token = validUser.token;

    next(); // Proceed to the next middleware/route handler
  } catch (e) {
    _authError(); // If authentication fails, invoke the _authError() function to handle authentication error
  }

  // Helper function to handle authentication error
  function _authError() {
    next('Unrecognized User: Your name is not inscribed in the tome of authorized adventurers. Entry denied.');
    // Pass an error message to the error-handling middleware to handle the authentication error
  }
};
