'use strict';
module.exports = function (err, req, res, next) {
  // Retrieve the error message from the error object or use the error object itself
  const error = err.message ? err.message : err;

  // Create an error object with status 500 and the error message
  const errorObject = {
    status: 500,
    message: error,
  };

  res.status(500).json(errorObject); // Send the response with the error object as JSON
};
