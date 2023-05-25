'use strict';

// function handle404(req, res, next) {
//   // Create an error object with status 404 and a descriptive message
//   const errorObject = {
//     status: 404,
//     message: 'Vanished from Existence: The scroll you seek has been misplaced in the annals of history. It is nowhere to be found(404).',
//   };

//   res.status(404).json(errorObject); // Send the response with the error object as JSON
// }

// module.exports = handle404; // Export the handle404 function


module.exports = (req,res,next) => {
  let error = { error: 'Vanished from Existence: The scroll you seek has been misplaced in the annals of history. It is nowhere to be found(404).' };
  res.statusCode = 404;
  res.statusMessage = 'Vanished from Existence: The scroll you seek has been misplaced in the annals of history. It is nowhere to be found(404).';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};