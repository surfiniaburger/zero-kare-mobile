// backend/src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service');
const config = require('../config/env.config');
const axios = require('axios');


// Middleware to validate request body
const validateRegistrationBody = (req, res, next) => {
  const { patientId, basicInfo, medicalHistoryText } = req.body;
  if (!patientId || !basicInfo || !medicalHistoryText) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  next();
};

// Get temporary token
router.post('/temp-token', async (req, res) => {
  try {
    const tempToken = authService.generateTempToken(req.body.clientId);
    res.json({ token: tempToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

// Proxy middleware for secured endpoints
const secureProxy = async (req, res, next) => {
  try {
    const tempToken = req.headers['x-temp-token'];
    if (!authService.validateTempToken(tempToken)) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const apigeeToken = await authService.getApigeeToken();
    req.headers['apikey'] = apigeeToken;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Registration endpoint
router.post('/register', 
  validateRegistrationBody,
  secureProxy,
  async (req, res) => {
    try {
      const response = await axios({
        method: 'post',
        url: config.registerEndpoint,
        headers: {
          'apikey': req.headers['apikey'],
          'Content-Type': 'application/json'
        },
        data: req.body
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ 
        error: 'Registration failed',
        details: error.response?.data || error.message
      });
    }
  }
);

module.exports = router;