'use strict';

const inventoryModel = (sequelize, DataTypes) => sequelize.define('Inventory', {
  // Define the fields of the Inventory model
  item: { type: DataTypes.STRING, required: true }, // Item field of type STRING and required
  quantity: { type: DataTypes.INTEGER, required: true }, // Quantity field of type INTEGER and required
  description: { type: DataTypes.STRING, required: true }, // Description field of type STRING and required
});

module.exports = inventoryModel; // Export the inventoryModel function
