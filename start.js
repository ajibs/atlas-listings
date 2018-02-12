const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log('Connected to Redis');
});

require('dotenv').config();

const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});
