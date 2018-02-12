const redis = require('redis');

const client = redis.createClient();

exports.addListing = async (req, res) => {
  const { id, name, description } = req.body;

  await client.hmset(id, [
    'name', name,
    'description', description
  ], (err, reply) => {
    if (err) {
      res.json({
        status: 400,
        message: 'Error! listing not saved',
        error: err
      });
    }
    res.json({
      status: 200,
      message: 'listing added successfully',
      data: reply
    });
  });
};


exports.showSingleListing = (req, res) => {
  const { id } = req.params;
  client.hgetall(id, (err, listing) => {
    if (!listing) {
      res.json({
        status: 400,
        message: 'Error! listing not found',
        error: err
      });
    } else {
      res.json({
        status: 200,
        message: 'listing found',
        data: listing
      });
    }
  });
};


exports.deleteListing = async (req, res) => {
  await client.del(req.params.id, (err, response) => {
    if (response === 1) {
      res.json({
        status: 200,
        message: 'listing deleted successfully'
      });
    } else {
      res.json({
        status: 400,
        message: 'listing not found'
      });
    }
  });
};
