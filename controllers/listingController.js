const redis = require('redis');

const client = redis.createClient();

exports.showHome = async (req, res) => {
  res.render('index', {
    title: 'Home',
    listings: ''
  });
};

exports.showListingForm = async (req, res) => {
  res.render('editListing', {
    title: 'Create Listing',
    listing: {}
  });
};

exports.addListing = async (req, res) => {
  const { id, name, description } = req.body;

  await client.hmset(id, [
    'name', name,
    'description', description
  ], (err, reply) => {
    if (err) {
      console.log(err);
    }
    console.log(reply);
  });

  res.redirect(`/listing/${id}`);
};


exports.showSingleListing = (req, res) => {
  const { id } = req.params;
  client.hgetall(id, (err, listing) => {
    if (!listing) {
      res.render('index', {
        error: 'listing does not exist'
      });
    } else {
      listing.id = id;
      res.render('listingDetails', {
        title: 'Listing',
        listing
      });
    }
  });
};


exports.showEditListing = (req, res) => {
  const { id } = req.params;
  client.hgetall(id, (err, listing) => {
    if (!listing) {
      res.redirect('/');
    }

    listing.id = id;
    res.render('editListing', {
      title: `Edit ${listing.name}`,
      listing
    });
  });
};


exports.deleteListing = async (req, res) => {
  await client.del(req.body.id);
  res.redirect('/');
};


/*

exports.deleteListing = async (req, res) => {
  await listing.deleteOne({ _id: req.body.id });
  req.flash('success', 'Successfully deleted listing');
  res.redirect('/dashboard');
};


/*
const listing = require('../models/listing');
const Category = require('../models/Category');
const {
  getAllCategories,
  extractCategories,
  incrementViews,
  tieListingtoCategory,
  searchDB
} = require('./utilityController');


exports.showHome = async (req, res) => {
  const listings = await listing.find({})
    .sort({ created: 'desc' })
    .limit(6);

  res.render('index', {
    title: 'Home',
    listings
  });
};


exports.showListingForm = async (req, res) => {
  const allCategories = await getAllCategories();

  res.render('editListing', {
    title: 'Create Listing',
    listing: {},
    allCategories
  });
};


exports.addNewListing = async (req, res) => {
  req.body.categories = extractCategories(req.body.categories);
  const listing = await (new listing(req.body)).save();

  tieListingtoCategory(listing.categories, String(listing._id));

  req.flash('success', `Successfully created <strong class="text-capitalize">${listing.name}</strong>`);
  res.redirect(`/listing/${listing._id}`);
};


// TODO: get listing by slug
exports.showSingleListing = async (req, res) => {
  const listing = await listing.findOne({ _id: req.params.id });

  if (!listing) {
    req.flash('failed', 'Error! listing NOT found');
    res.redirect('back');
    return;
  }

  if (!req.user) {
    incrementViews(listing);
  }

  res.render('listingDetails', {
    title: 'Listing Details',
    listing
  });
};


exports.showEditListing = async (req, res) => {
  const listing = await listing.findOne({ _id: req.params.id });
  const allCategories = await getAllCategories();

  res.render('editListing', {
    title: `Edit ${listing.name}`,
    listing,
    allCategories
  });
};


exports.updateListing = async (req, res) => {
  req.body.categories = extractCategories(req.body.categories);

  const listing = await listing.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  tieListingtoCategory(listing.categories, String(listing._id));

  req.flash('success', `Successfully updated <strong>${listing.name}</strong>. <a href="/listing/${listing._id}">View Listing</a>`);
  res.redirect(`/listing/${listing._id}/edit`);
};


exports.deleteListing = async (req, res) => {
  await listing.deleteOne({ _id: req.body.id });
  req.flash('success', 'Successfully deleted listing');
  res.redirect('/dashboard');
};
*/
