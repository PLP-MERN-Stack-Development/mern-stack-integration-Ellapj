// server/routes/categories.js
const express = require('express');
const router = express.Router();

// NOTE: We will secure the POST, PUT, and DELETE routes with the protect 
// middleware later (e.g., protect, admin only check)

// Import ALL necessary controller functions for Category CRUD
const { 
    createCategory, 
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController'); // <-- Ensure all 4 are imported!

// Routes without an ID
router.route('/')
    .post(createCategory)  // POST /api/categories (Create)
    .get(getCategories);   // GET /api/categories (Read All)

// Routes with an ID
router.route('/:id')
    // No .get(getCategoryById) is needed, as we can get all categories above,
    // but you could add it if required later.
    .put(updateCategory)    // PUT /api/categories/:id (Update)
    .delete(deleteCategory); // DELETE /api/categories/:id (Delete)

module.exports = router;