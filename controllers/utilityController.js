const redis = require('redis');

const client = redis.createClient();

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);


exports.validateListing = (req, res, next) => {
  req.checkBody('id', 'You must supply an ID!').notEmpty();
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('description', 'Description cannot be blank!').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    res.json({
      status: 400,
      message: 'Error! You must supply an id, name and description'
    });
    return;
  }
  next();
};


exports.sanitizeData = (req, res, next) => {
  if (req.query.q) {
    req.body = req.query;
  }

  Object.keys(req.body).forEach((key) => {
    req.body[key] = DOMPurify.sanitize(req.body[key]);
  });

  next();
};

exports.clean = data => DOMPurify.sanitize(data);


exports.notFound = (req, res) => {
  res.json({
    status: 404,
    message: 'Page does not exist'
  });
};

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
        res.json({
          status: 400,
          message: 'database seeding unsuccessful'
        });
      }
      res.json({
        status: 200,
        message: 'database seeded successfully',
        data: reply
      });
    });
  });
};
