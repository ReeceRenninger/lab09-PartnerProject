'use strict';

// Define a class called DataCollection
class DataCollection {

  constructor(model) {
    this.model = model; // Store the model provided in the constructor
  }

  // Get method to fetch data from the collection
  get(id) {
    if (id) {
      // If an ID is provided, retrieve a specific record using the model's findOne method
      return this.model.findOne({ where: { id } });
    }
    else {
      // If no ID is provided, retrieve all records using the model's findAll method
      return this.model.findAll({});
    }
  }

  // Create method to create a new record in the collection
  create(record) {
    return this.model.create(record); // Use the model's create method to create the record
  }

  // Update method to update an existing record in the collection
  update(id, data) {
    return this.model.findOne({ where: { id } })
      .then(record => record.update(data)); // Find the record by ID and update its data
  }

  // Delete method to delete a record from the collection
  delete(id) {
    return this.model.destroy({ where: { id }}); // Use the model's destroy method to delete the record
  }

}

module.exports = DataCollection; // Export the DataCollection class
