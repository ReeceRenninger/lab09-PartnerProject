'use strict';

const base64 = require('base-64');
const { users } = require('../../models/index');

module.exports = async (req, res, next) => {

  // Checking if the Authorization header is present
  if (!req.headers.authorization) { 
    return _authError(); // If not present, return an authentication error
  }

  // Extracting the username and password from the Authorization header
  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  try {
    // Authenticating the user with the provided credentials
    req.user = await users.authenticateBasic(user, pass);
    next(); // Proceed to the next middleware/route handler
  } catch (e) {
    _authError(); // If authentication fails, return an authentication error
  }

  // Helper function to send an authentication error response
  function _authError() {
    res.status(403).send('Invalid Credentials: The mystical sigils you\'ve provided do not match those required to unlock this portal.');
  }

};
