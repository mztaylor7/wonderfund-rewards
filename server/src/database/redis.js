require('dotenv').config();
const redis = require('redis');

const redisClient = redis.createClient({port: process.env.RDPORT, host: process.env.RDHOST, no_ready_check: true});

redisClient.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

module.exports.redisClient = redisClient;
module.exports.redis = redis;