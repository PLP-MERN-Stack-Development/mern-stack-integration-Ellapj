// server/models/Category.js
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

// Optional: Pre-save hook to generate slug from name
CategorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
    next();
});

module.exports = mongoose.model('Category', CategorySchema);