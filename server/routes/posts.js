// server/routes/posts.js
const express = require('express');
const router = express.Router();

// NEW: Import the protect middleware
const { protect } = require('../middleware/authMiddleware'); // <-- ADD THIS IMPORT

// Import ALL necessary controller functions for CRUD
const { 
  getPosts, 
  createPost, 
  getPostById,
  updatePost, 
  deletePost 
} = require('../controllers/postController'); 

// The root path ('/api/posts')
router.route('/')
  .get(getPosts)     // GET /api/posts (Read All - Public)
  .post(createPost); // POST /api/posts (Create - Public for now, will be restricted later)

// The path with an ID ('/api/posts/:id')
router.route('/:id')
  .get(getPostById)      // GET /api/posts/:id (Read One - Public)
  .put(protect, updatePost)  // <-- SECURED: Requires JWT token
  .delete(protect, deletePost); // <-- SECURED: Requires JWT token

module.exports = router;