'use strict';

const express = require('express');
const dataModules = require('../models');
const acl = require('../auth/middleware/acl');
const bearerAuth = require('../auth/middleware/bearer');
const router = express.Router();

// Custom parameter middleware that checks if the requested model is valid
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// Routes for CRUD operations on models
router.get('/:model', bearerAuth, handleGetAll); // Get all records of a specific model
router.get('/:model/:id', bearerAuth, handleGetOne); // Get a specific record of a model
router.post('/:model', bearerAuth, acl('create'), handleCreate); // Create a new record
router.put('/:model/:id', bearerAuth, acl('update'), handleUpdate); // Update a specific record
router.patch('/:model/:id', bearerAuth, acl('update'), handleUpdate); // Update a specific record (alternative method)
router.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete); // Delete a specific record

// Handler for getting all records of a specific model
async function handleGetAll(req, res, next) {
  try {
    let allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (error) {
    next(
      error.message ||
        'Forbidden Archives: The enchanted gates of the grand repository refuse to grant access, concealing the vast array of records from your reach.',
      error);
  }
}

// Handler for getting a specific record of a model
async function handleGetOne(req, res, next) {
  try {
    const id = req.params.id;
    let theRecord = await req.model.get(id);
    res.status(200).json(theRecord);
  } catch (error) {
    next(
      error.message ||
        'Elusive Enigma: The essence of the singular record eludes your grasp, slipping through your fingers like a ghostly apparition. It resists all attempts at capture.',
      error);
  }
}

// Handler for creating a new record
async function handleCreate(req, res, next) {
  try {
    let obj = req.body;
    let newRecord = await req.model.create(obj);
    res.status(201).json(newRecord);
  } catch (error) {
    next(
      error.message ||
        'Unwritten Fate: The quill of destiny refuses to inscribe your words upon the pages of reality. Your attempts to create a new record are met with an ethereal resistance.',
      error);
  }
}

// Handler for updating a specific record
async function handleUpdate(req, res, next) {
  try {
    const id = req.params.id;
    const obj = req.body;
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (error) {
    next(
      error.message ||
        'Immutable Enchantment: The record you seek to modify bears an ancient enchantment, warding off any changes. Its contents are protected by an unyielding magical barrier.',
      error);
  }
}

// Handler for deleting a specific record
async function handleDelete(req, res, next) {
  try {
    let id = req.params.id;
    let deletedRecord = await req.model.delete(id);
    res.status(200).json(deletedRecord);

  } catch (error) {
    next(error.message || 'Indestructible Tome: The record you seek to erase possesses an impenetrable enchantment, safeguarding it from deletion. Its presence endures against all attempts to remove it.', error);
  }
}

module.exports = router;