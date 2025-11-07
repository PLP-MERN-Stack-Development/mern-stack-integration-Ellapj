// server/routes/auth.js
const express = require('express');
const router = express.Router();

// Import the controller function
const { 
    register 
} = require('../controllers/authController');

// POST /api/auth/register
router.post('/register', register); 

// Future routes will go here:
// router.post('/login', login); 
// router.get('/me', protect, getMe);

module.exports = router;