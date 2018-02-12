const express = require('express');
const listingController = require('../controllers/listingController');
const utilityController = require('../controllers/utilityController');
const { catchErrors } = require('../handlers/errorHandlers');

const router = express.Router();


router.get('/', listingController.showHome);

// create listing
router.get(
  '/create-listing',
  listingController.showListingForm
);
router.post(
  '/create-listing',
  utilityController.validateListing,
  utilityController.sanitizeData,
  listingController.addListing
);


// view listing
router.get('/listing/:id', listingController.showSingleListing);


// update listing
router.get(
  '/listing/:id/edit',
  listingController.showEditListing
);
router.post(
  '/create-listing/:id',
  utilityController.validateListing,
  utilityController.sanitizeData,
  listingController.addListing
);


// delete listing
router.post(
  '/delete-listing',
  utilityController.sanitizeData,
  listingController.deleteListing
);


// TODO: comment out route
// router.get('/seed', catchErrors(utilityController.seedDB));


module.exports = router;
