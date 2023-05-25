'use strict';

const characterModel = (sequelize, DataTypes) => sequelize.define('character', {
  // Define the fields of the Character model
  name: { type: DataTypes.STRING, required: true }, // Name field of type STRING and required
  race: { type: DataTypes.STRING, required: true }, // Race field of type STRING and required
  class: { type: DataTypes.STRING, required: true }, // Class field of type STRING and required
});

module.exports = characterModel; // Export the characterModel function
