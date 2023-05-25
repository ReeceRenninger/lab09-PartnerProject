'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('../models/index'); // Importing the Users model
const basicAuth = require('./middleware/basic.js'); // Importing the basic authentication middleware
const bearerAuth = require('./middleware/bearer.js'); // Importing the bearer token authentication middleware
const permissions = require('./middleware/acl.js'); // Importing the access control middleware
//TODO: fix our roll dice function to work in our dungeon route
const rollDice = require('./middleware/roller.js');

// Route for user signup
authRouter.post('/signup', async (req, res, next) => {
  try {
    // Create a new user record with the provided request body
    let userRecord = await users.create(req.body);

    // Create the response output with the user record and token
    const output = {
      user: userRecord,
      token: userRecord.token,
    };

    res.status(201).json(output); // Send the response with status 201 (Created)
  } catch (e) {
    next(e.message); // Pass any errors to the error-handling middleware
  }
});

// Route for user signin
authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user); // Send the response with the user object and token
});

// Route for getting all users with delete permission
authRouter.get('/users', bearerAuth, permissions('delete'), async (req, res, next) => {
  // Find all user records
  const userRecords = await users.findAll({});

  // Extract the usernames from the user records
  const list = userRecords.map(user => user.username);
  res.status(200).json(list); // Send the response with the list of usernames
});

// Route for accessing the dungeon
authRouter.get('/dungeon', bearerAuth, async (req, res, next) => {
  let results = rollDice(15);

  res.status(200).send(`Welcome to the Dungeon! Roll an acrobatics check (must hit 15) or fall into the chasm of doom! You ${results}`);
},
  // Send a welcome message for accessing the dungeon route

);

module.exports = authRouter; // Export the authRouter
