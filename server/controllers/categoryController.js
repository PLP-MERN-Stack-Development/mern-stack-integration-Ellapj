// server/controllers/categoryController.js
const Category = require('../models/Category');

// @desc    Create a new category
// @route   POST /api/categories
// @access  Public (Will be Admin-only later)
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create and save the new category (slug is auto-generated)
        const newCategory = await Category.create({ name });

        res.status(201).json(newCategory);

    } catch (error) {
        // Handle Mongoose validation errors
        res.status(500).json({ message: error.message });
    }
};

// We will add getCategories, updateCategory, and deleteCategory here later.