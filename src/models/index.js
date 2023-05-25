'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const characterModel = require('./character/character.js');
const inventoryModel = require('./inventory/inventory.js');
const userModel = require('../auth/models/users');
const Collection = require('./data-collection.js');

// Set the database URL based on the environment
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory:'
  : process.env.DATABASE_URL;

// Create a new instance of Sequelize using the database URL
const sequelize = new Sequelize(DATABASE_URL);

// Create the character model using the sequelize instance and DataTypes
const character = characterModel(sequelize, DataTypes);

// Create the inventory model using the sequelize instance and DataTypes
const inventory = inventoryModel(sequelize, DataTypes);

// Create the users model using the sequelize instance and DataTypes
const users = userModel(sequelize, DataTypes);

// Export an object that contains the database connection, models, and data collections
module.exports = {
  db: sequelize, // Database connection instance
  character: new Collection(character), // Data collection for characters
  inventory: new Collection(inventory), // Data collection for inventory
  users, // Users model
};
