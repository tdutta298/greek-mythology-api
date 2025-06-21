require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
const godRoutes = require('./routes/gods');
app.use('/api/gods', godRoutes);

const heroesRoutes = require('./routes/heroes');
app.use('/api/heroes', heroesRoutes);

const creaturesRoutes = require('./routes/creatures');
app.use('/api/creatures', creaturesRoutes);


const mythsRoutes = require('./routes/myths');
app.use('/api/myths', mythsRoutes);



// Test Route
app.get('/', (req, res) => {
  res.send('Greek Mythology API is running! ⚡');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection failed:', err));
