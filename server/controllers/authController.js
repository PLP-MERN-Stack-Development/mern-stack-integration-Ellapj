// server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Hash the password
        // The User model needs to be updated to hash the password before saving, 
        // but for a quick unblock, we use bcrypt directly here.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and save the user
        const newUser = new User({
            username,
            email,
            password: hashedPassword, 
        });
        
        const user = await newUser.save(); 

        // 4. Respond with success
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            message: 'User registered successfully.'
        });

    } catch (error) {
        // Handle Mongoose validation errors 
        res.status(500).json({ message: error.message });
    }
};

// Next, we will add the login function here.