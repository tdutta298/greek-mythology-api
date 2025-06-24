require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gods', require('./routes/gods'));
app.use('/api/heroes', require('./routes/heroes'));
app.use('/api/creatures', require('./routes/creatures'));
app.use('/api/myths', require('./routes/myths'));

// Test Route
app.get('/', (req, res) => {
  res.send('Greek Mythology API is running! ⚡');
});

module.exports = app; // Export ONLY the app
