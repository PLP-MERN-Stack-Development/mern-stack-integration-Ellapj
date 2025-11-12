// client/src/pages/RegisterPage.jsx (FINAL EDIT)
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '', // Kept for local validation/rendering
    });

    const { username, email, password, password2 } = formData;
    
    const { user, register } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => { 
        e.preventDefault();

        if (password !== password2) {
            alert('Passwords do not match'); 
            return;
        }

        const userData = { username, email, password };
        
        // --- ADDED FINAL CLIENT-SIDE DEBUG LOG ---
        console.log('--- CLIENT DEBUG: Attempting registration with data:', userData);
        // ------------------------------------------

        try {
            await register(userData);
            console.log('Registration Successful! Redirecting...');
        } catch (error) {
            console.error('Registration Failed:', error);
            // This alert shows the message from the backend (e.g., "User already exists")
            alert('Registration Failed: ' + (error.message || 'Check server logs'));
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={onSubmit} style={styles.form}>
                <h2>Register Account</h2>

                <input type="text" name="username" value={username} placeholder="Username" onChange={onChange} required style={styles.input} />
                <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required style={styles.input} />
                <input type="password" name="password" value={password} placeholder="Password" onChange={onChange} required style={styles.input} />
                <input type="password" name="password2" value={password2} placeholder="Confirm Password" onChange={onChange} required style={styles.input} />
                
                <button type="submit" style={styles.button}>Register</button>

                <p style={{marginTop: '15px'}}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}

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

export default RegisterPage;