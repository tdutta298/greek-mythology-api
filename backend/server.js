const mongoose = require('mongoose');
const app = require('./app'); // Import the Express app

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection failed:', err));
