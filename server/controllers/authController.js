// server/controllers/authController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// Function to generate JWT (Helper Function)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data provided to database');
    }
});

// @desc    Authenticate user & get token (Login function)
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user by email
    // CRITICAL FIX: Add .select('+password') to retrieve the hashed password
    const user = await User.findOne({ email }).select('+password'); 

    if (user && (await bcrypt.compare(password, user.password))) {
        // Success
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        // Authentication failed
        res.status(401);
        throw new Error('Invalid credentials');
    }
});


module.exports = {
    registerUser,
    loginUser,
    generateToken
};