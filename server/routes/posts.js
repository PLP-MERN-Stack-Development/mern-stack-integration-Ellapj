// server/routes/posts.js
const express = require('express');
const router = express.Router();

// Import ALL necessary controller functions for CRUD
const { 
  getPosts, 
  createPost, 
  getPostById,
  updatePost,  // <-- NEW: Import Update
  deletePost   // <-- NEW: Import Delete
} = require('../controllers/postController'); 

// The root path ('/api/posts')
router.route('/')
  .get(getPosts)     // GET /api/posts (Read All)
  .post(createPost); // POST /api/posts (Create)

// The path with an ID ('/api/posts/:id')
router.route('/:id')
  .get(getPostById) // GET /api/posts/:id (Read One)
  .put(updatePost)  // <-- NEW: PUT /api/posts/:id (Update)
  .delete(deletePost); // <-- NEW: DELETE /api/posts/:id (Delete)

module.exports = router;