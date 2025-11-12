// client/src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the custom hook

function Navbar() {
  // Get the current user state from our global context
    const { user, logout } = useAuth();

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>MERN Blog</Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>Home</Link>

        {user ? (
          // Display welcome and Logout button if user is logged in
          <>
            <span style={styles.welcome}>Welcome, {user.username || 'User'}!</span>
            <button onClick={logout} style={styles.button}>
                            Logout
                        </button>
          </>
        ) : (
          // Display Login and Register links if user is NOT logged in
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: 'white',
    marginBottom: '20px',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
  },
  welcome: {
    padding: '0.5rem 1rem',
    color: '#ccc',
  },
  logoutButton: {
    background: 'none',
    border: '1px solid white',
    color: 'white',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
  }
};

export default Navbar;