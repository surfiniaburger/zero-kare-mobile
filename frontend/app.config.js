// File: app.config.js
export default {
    expo: {
      name: 'zero kare',
      "slug": "zero-kare",
      "version": "1.0.0",
      extra: {
        apiUrl: process.env.API_URL || 'http://localhost:3000',
      },
    },
  };