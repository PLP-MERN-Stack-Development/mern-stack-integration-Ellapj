// server/server.js - Main server file for the MERN blog application

// 1. --- CONFIGURATION & IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// **FIX 1: Explicitly load environment variables from the server directory**
dotenv.config({ path: path.resolve(__dirname, '.env') }); 

// 2. --- SETUP ---
const app = express();
// Use MONGODB_URI to match what the code looks for
const MONGO_URI = process.env.MONGODB_URI; 
const PORT = process.env.PORT || 5000;

// Import and use routes (Files must exist as you previously fixed)
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const authRoutes = require('./routes/auth');

// 3. --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple logging for development mode
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}

// 4. --- API ROUTES ---
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Blog API is running');
});

// 5. --- DATABASE CONNECTION & SERVER START ---

// Check if MONGO_URI is available before attempting connection
if (!MONGO_URI) {
    console.error("❌ FATAL ERROR: MONGODB_URI is not defined in .env file.");
    process.exit(1);
}

// **FIX 2: Use modern Mongoose connect and handle errors robustly**
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB. Check if your local MongoDB instance is running.', err);
    process.exit(1); // Exit if the connection fails
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

module.exports = app;