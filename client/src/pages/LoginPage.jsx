// client/src/pages/LoginPage.jsx (Full Implementation)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function LoginPage() {
    // 1. STATE: Only need email and password for login
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formData;
    
    // 2. CONTEXT & ROUTING
    const { user, login } = useAuth(); // Get the login function from AuthContext
    const navigate = useNavigate();

    // 3. REDIRECT: Redirect if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    // 4. HANDLERS
    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password }; 
        
        try {
            // Call the context function, which calls authService
            await login(userData); // Use the 'login' function

            // Success: useEffect handles the redirect to the home page
            console.log('Login Successful! Redirecting...');
        } catch (error) {
            // Failure: Display error message from the backend
            console.error('Login Failed:', error);
            alert('Login Failed: ' + (error.message || 'Check server logs'));
        }
    };

    // 5. RENDER
    return (
        <div style={styles.container}>
            <form onSubmit={onSubmit} style={styles.form}>
                <h2>Login to Account</h2>

                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                    required
                    style={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                    required
                    style={styles.input}
                />
                
                <button type="submit" style={styles.button}>Login</button>

                <p style={{marginTop: '15px'}}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

// 6. STYLES: Use the exact same styles as the Register Page for consistency
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '350px',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

export default LoginPage;