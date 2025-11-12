// client/src/App.jsx
import { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// New Imports for the Application Structure
import Navbar from './components/Navbar'; // From components/ folder
import { AuthProvider } from './context/AuthContext'; // From context/ folder
import RegisterPage from './pages/RegisterPage'; // From pages/ folder
import LoginPage from './pages/LoginPage';

function App() {
  // Connection Test Logic (We keep this here for now)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This calls your backend API via the proxy
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(err => {
        // If the backend server is NOT running, this error will fire
        setError('Failed to fetch posts: Is the backend server running? ' + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <AuthProvider> {/* Global state wrapper */}
        <Navbar /> {/* Renders on every page */}
        <div className="app-container" style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={
              <>
                {/* Connection Test Display: */}
                {loading && <h1>Connecting to Backend...</h1>}
                {error && <h1 style={{color: 'red'}}>{error}</h1>}
                {posts.length > 0 && 
                    <h1 style={{color: 'green'}}>✅ Connection SUCCESS! {posts.length} Post(s) Found.</h1>
                }
                
                <h2>Home Page (Blog Feed)</h2>
              </>
            } />
            
            {/* Pages */}
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;