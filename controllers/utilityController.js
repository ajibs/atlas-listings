const redis = require('redis');

const client = redis.createClient();

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);


exports.validateListing = (req, res, next) => {
  console.log('validating listing');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('description', 'Description cannot be blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.render('create-listing', {
      title: 'Create Listing',
      body: req.body
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};


exports.sanitizeData = (req, res, next) => {
  console.log('sanitizing data');
  if (req.query.q) {
    req.body = req.query;
  }

  Object.keys(req.body).forEach((key) => {
    req.body[key] = DOMPurify.sanitize(req.body[key]);
  });

  next();
};

exports.clean = data => DOMPurify.sanitize(data);


// create demo data
exports.seedDB = async (req, res) => {
  const companies = [
    { id: 'biz001', name: 'konga', description: 'buy anything online' },
    { id: 'biz002', name: 'devcenter', description: 'hire great developers' },
    { id: 'biz003', name: 'paystack', description: 'simple payments' },
    { id: 'biz004', name: 'andela', description: 'training world class developers' },
    { id: 'biz005', name: 'jumia', description: 'best online shopping' }
  ];

  await companies.forEach((company) => {
    client.hmset(company.id, [
      'name', company.name,
      'description', company.description
    ], (err, reply) => {
      if (err) {
        console.log(err);
      }
      console.log(reply);
    });
  });

  res.redirect('/');
};
