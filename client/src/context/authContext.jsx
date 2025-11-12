// client/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService'; // <-- Correctly imports the service

// 1. Create the Context object
const AuthContext = createContext();

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage to persist login status on refresh
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    // --- Authentication Logic ---

    // Register user
    const register = async (userData) => {
        try {
            const newUser = await authService.register(userData);
            setUser(newUser); // Update global state
            return newUser;
        } catch (error) {
            // Re-throw the error for component handling
            throw error;
        }
    };

    // Login user
    const login = async (userData) => {
        try {
            const loggedInUser = await authService.login(userData);
            setUser(loggedInUser); // Update global state
            return loggedInUser;
        } catch (error) {
            // Re-throw the error for component handling
            throw error;
        }
    };

    // Logout user
    const logout = () => {
        authService.logout();
        setUser(null); // Clear global state
    };

    // We use useEffect to update localStorage whenever the user state changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const value = {
        user,
        setUser,
        register, 
        login,    
        logout,   
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create a custom hook for easy access
export const useAuth = () => {
    return useContext(AuthContext);
};
