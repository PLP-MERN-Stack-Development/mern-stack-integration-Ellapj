// server/controllers/postController.js
const Post = require('../models/Post'); // Import the Post Model (the blueprint)

// ---------------------------------------------
// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    // Fetch posts and optionally populate related User (author) and Category data
    const posts = await Post.find({})
      .populate('author', 'username email') // Only get username and email from User
      .populate('category', 'name slug');  // Only get name and slug from Category

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------------------------
// @desc    Create a new post
// @route   POST /api/posts
// @access  Public 
exports.createPost = async (req, res) => {
  // 1. Destructure ALL required fields from the request body
  const { title, content, author, category, featuredImage } = req.body; 

  // 2. Basic check for required fields 
  if (!title || !content || !author || !category) {
    return res.status(400).json({ message: 'Title, content, author, and category are required' });
  }

  // 3. Manually Generate Slug (Fix for Model hook failure)
  const slug = title
    .toLowerCase()
    .replace(/[^\w ]+/g, '') // Remove all non-word chars except spaces
    .replace(/ +/g, '-'); // Replace spaces with hyphens

  try {
    // 4. Create the document, explicitly providing the generated slug
    const newPost = await Post.create({
      title,
      content,
      author,     
      category,   
      slug,       // The manually generated slug
      featuredImage, 
    });
    
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Post Creation Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------
// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    // Fetch the post and populate related User (author) and Category data
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email')
      .populate('category', 'name slug');

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid Post ID or Server Error' });
  }
};

// ---------------------------------------------
// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public (for now, will be restricted by auth middleware later)
exports.updatePost = async (req, res) => {
    // Destructure all possible update fields
    const { title, content, featuredImage, author, category, excerpt, isPublished, tags } = req.body;

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // 1. Update fields if provided
        if (title) post.title = title;
        if (content) post.content = content;
        if (featuredImage) post.featuredImage = featuredImage;
        if (author) post.author = author;
        if (category) post.category = category;
        if (excerpt) post.excerpt = excerpt;
        if (isPublished !== undefined) post.isPublished = isPublished;
        if (tags) post.tags = tags; // Assuming tags is an array

        // 2. Manually Update Slug if the title was modified
        if (title) { 
            post.slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
        }

        // 3. Save the updated document
        const updatedPost = await post.save();
        
        res.status(200).json(updatedPost);

    } catch (error) {
        console.error("Post Update Error:", error.message);
        res.status(400).json({ message: error.message });
    }
};

// ---------------------------------------------
// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Public (for now)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Send a confirmation message
    res.status(200).json({ message: 'Post removed successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};