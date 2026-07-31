import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import UserProfile from './components/UserProfile.jsx';

const API_BASE_URL = 'http://localhost:7001';

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
          <div className="brand-badge">
            <svg className="brand-icon" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.81z"/>
            </svg>
            <span>PARO AUTH</span>
          </div>

          <h1 className="auth-title">
            {user
              ? 'Welcome Back'
              : activeTab === 'login'
              ? 'Sign in to your account'
              : 'Create a new account'}
          </h1>
          <p className="auth-subtitle">
            {user
              ? 'You are securely logged into Paro Services.'
              : activeTab === 'login'
              ? 'Enter your credentials to access your dashboard'
              : 'Fill in your details to get started with Paro'}
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
