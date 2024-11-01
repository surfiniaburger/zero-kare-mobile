// backend/src/config/env.config.js
require('dotenv').config();


module.exports = {
  port: process.env.PORT || 3000,
  apigeeConsumerKey: process.env.APIGEE_CONSUMER_KEY,
  apigeeConsumerSecret: process.env.APIGEE_CONSUMER_SECRET,
  tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://34.49.13.123.nip.io/token',
  registerEndpoint: process.env.REGISTER_ENDPOINT || 'https://34.49.13.123.nip.io/zk/v1/record/register',
  loginEndpoint: process.env.LOGIN_ENDPOINT || 'https://34.49.13.123.nip.io/zk/v1/record/login'
};