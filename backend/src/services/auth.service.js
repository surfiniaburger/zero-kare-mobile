// backend/src/services/auth.service.js
const crypto = require('crypto');
const axios = require('axios');
const config = require('../config/env.config');

class AuthService {
  constructor() {
    this.APIGEE_CONSUMER_KEY = config.apigeeConsumerKey;
    this.APIGEE_CONSUMER_SECRET = config.apigeeConsumerSecret;
    this.TOKEN_ENDPOINT = config.tokenEndpoint;
    this.tokenCache = new Map();
  }

  generateTempToken(clientId) {
    const token = crypto.randomBytes(32).toString('hex');
    // Store token with expiration
    this.tokenCache.set(token, {
      clientId,
      expires: Date.now() + 3600000 // 1 hour expiration
    });
    return token;
  }

  validateTempToken(token) {
    const tokenData = this.tokenCache.get(token);
    if (!tokenData) return false;
    if (Date.now() > tokenData.expires) {
      this.tokenCache.delete(token);
      return false;
    }
    return true;
  }

  async getApigeeToken() {
    try {
      const auth = Buffer.from(
        `${this.APIGEE_CONSUMER_KEY}:${this.APIGEE_CONSUMER_SECRET}`
      ).toString('base64');
      
      const response = await axios({
        method: 'post',
        url: this.TOKEN_ENDPOINT,
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=client_credentials'
      });

      return response.data.access_token;
    } catch (error) {
      console.error('Error getting Apigee token:', error);
      throw new Error('Failed to get access token');
    }
  }
}

module.exports = new AuthService();