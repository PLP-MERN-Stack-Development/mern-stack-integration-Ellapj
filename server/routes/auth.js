// server/routes/auth.js (CORRECTED)
const express = require('express');
const router = express.Router();

// Import the controller functions using the correct names (registerUser and loginUser)
const { 
    registerUser, // <-- CORRECTED NAME
    loginUser     // <-- CORRECTED NAME
} = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', registerUser); // <-- Use the correct name

// POST /api/auth/login
router.post('/login', loginUser); // <-- Use the correct name

// Future routes will go here:
// router.get('/me', protect, getMe);

module.exports = router;