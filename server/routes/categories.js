// server/routes/categories.js
const express = require('express');
const router = express.Router();

// Import the controller function
const { 
    createCategory 
} = require('../controllers/categoryController'); // <-- Ensure this path is correct!

// POST /api/categories
router.post('/', createCategory); 

// Future Category CRUD routes will go here

module.exports = router;