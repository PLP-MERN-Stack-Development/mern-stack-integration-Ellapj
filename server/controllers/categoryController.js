// server/controllers/categoryController.js
const Category = require('../models/Category');

// ---------------------------------------------
// @desc    Create a new category
// @route   POST /api/categories
// @access  Public (Will be Admin-only later)
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

// ---------------------------------------------
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ---------------------------------------------
// @desc    Update category by ID
// @route   PUT /api/categories/:id
// @access  Private (Admin only - secure this later)
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    
    try {
        // Find the category by ID
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Update the name and let the pre-save hook regenerate the slug
        category.name = name || category.name;
        
        const updatedCategory = await category.save();

        res.status(200).json(updatedCategory);
    } catch (error) {
        // Mongoose validation errors (e.g., name is required)
        res.status(400).json({ message: error.message });
    }
};

// ---------------------------------------------
// @desc    Delete category by ID
// @route   DELETE /api/categories/:id
// @access  Private (Admin only - secure this later)
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};