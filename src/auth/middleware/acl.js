'use strict';

// Exporting a middleware function that checks user capabilities
module.exports = (capability) => {
  return (req, res, next) => {
    try {
      // Checking if the user has the required capability
      if (req.user.capabilities.includes(capability)) {
        next(); // Proceed to the next middleware/route handler
      } else {
        next('Access Denied: You lack the necessary credentials to breach these arcane wards.');
        // If user does not have the required capability, pass an error message to the error-handling middleware
      }
    } catch (e) {
      next('Invalid Credentials: The keyring you have does not have the proper key to unlock this portal.');
      // If an error occurs during the try block (e.g., req.user.capabilities is undefined), pass an error message to the error-handling middleware
    }
  };
};
