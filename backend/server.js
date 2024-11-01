// backend/src/server.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/auth.routes');
const config = require('./src/config/env.config');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});