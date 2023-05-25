// 'use strict';
// module.exports = function (err, req, res, next) {
//   // Retrieve the error message from the error object or use the error object itself
//   const error = err.message ? err.message : err;

//   // Create an error object with status 500 and the error message
//   const errorObject = {
//     status: 500,
//     message: error,
//   };

//   res.status(500).json(errorObject); // Send the response with the error object as JSON
// };


'use strict';

module.exports = (err, req, res, next) => {
  let error = { error: err.message || err };
  res.statusCode = err.status || 500;
  res.statusMessage = err.statusMessage || 'Arcane Failure: The server\'s magical energies have become unstable, causing a surge of wild magic. The server\'s spells fizzle out, leaving the adventurers in a state of confusion and uncertainty.';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};
