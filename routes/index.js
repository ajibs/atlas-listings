const express = require('express');
const listingController = require('../controllers/listingController');
const utilityController = require('../controllers/utilityController');

const router = express.Router();

// create listing
router.post(
  '/create-listing',
  utilityController.validateListing,
  utilityController.sanitizeData,
  listingController.addListing
);

// view listing
router.get(
  '/listing/:id',
  listingController.showSingleListing
);

// update listing
router.put(
  '/update-listing/:id',
  utilityController.validateListing,
  utilityController.sanitizeData,
  listingController.addListing
);

// delete listing
router.delete(
  '/delete-listing/:id',
  utilityController.sanitizeData,
  listingController.deleteListing
);

// seed database
router.get('/seed', utilityController.seedDB);

// 404 page
router.get('*', utilityController.notFound);

module.exports = router;
