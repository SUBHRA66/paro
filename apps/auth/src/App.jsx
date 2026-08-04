import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import UserProfile from './components/UserProfile.jsx';

const API_BASE_URL = 'http://localhost:7777';

function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  // Restore stored session on startup
  useEffect(() => {
    const storedToken = localStorage.getItem('paro_auth_token');
    const storedUser = localStorage.getItem('paro_auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        localStorage.removeItem('paro_auth_token');
        localStorage.removeItem('paro_auth_user');
      }
    }
  }, []);

  const handleAuthSuccess = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('paro_auth_token', userToken);
    localStorage.setItem('paro_auth_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('paro_auth_token');
    localStorage.removeItem('paro_auth_user');
  };

  return (
    <>
      {/* Background Blobs */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>

      <div className="auth-card">
        <header className="auth-header">

          <h1 className="auth-title">
            {user
              ? 'Welcome Back'
              : activeTab === 'login'
                ? 'Sign in to your account'
                : 'Create a new account'}
          </h1>
          <p className="auth-subtitle">
            {user
              ? 'Logged in succesfully'
              : activeTab === 'login'
                ? 'Enter your credentials'
                : 'Enter your details'}
          </p>
        </header>

        {user ? (
          <UserProfile user={user} token={token} onLogout={handleLogout} />
        ) : (
          <>
            <div className="tabs-nav" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'login'}
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Sign In
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'signup'}
                className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>

            {activeTab === 'login' ? (
              <LoginForm
                onLoginSuccess={handleAuthSuccess}
                API_BASE_URL={API_BASE_URL}
              />
            ) : (
              <SignupForm
                onSignupSuccess={handleAuthSuccess}
                API_BASE_URL={API_BASE_URL}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
