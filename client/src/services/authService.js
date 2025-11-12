import axios from 'axios';
const API_URL = 'http://localhost:5000/api/auth';
// Register user
const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);

        if (response.data.token) {
            // Store the entire user object (including token) in localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        // Re-throw the error so the component can handle failure messages
        throw error.response.data || error.message; 
    }
};

// Login user
const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);

        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
    } catch (error) {
        throw error.response.data || error.message;
    }
};

// Logout user
const logout = () => {
    // Logging out is simple: clear the stored user from localStorage
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;