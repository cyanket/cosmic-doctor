// LoginScreen.jsx
import React, { useState } from 'react';
import './LoginScreen.css';
import Dashboard from '../Dashboard/Dashboard';

const LoginScreen = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [role, setRole] = useState('staff');
  const [showMFA, setShowMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call for authentication
    setTimeout(() => {
      setIsLoading(false);
      // setShowMFA(true);
      setIsAuthenticated(true);
    }, 1500);
  };

  const handleMFASubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!verificationCode) {
      setError('Please enter the verification code.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call for MFA verification
    setTimeout(() => {
      setIsLoading(false);
      setIsAuthenticated(true);
    }, 1500);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setVerificationCode('');
    setShowMFA(false);
    setError('');
  };

  if (isAuthenticated) {
    return <Dashboard role={role} />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header justify-items-center">
          <img width={150} src="/logo-smart.png"></img>
          <h6>Secure Healthcare Platform</h6>
        </div>

        {/* <div className="tabs">
          <button 
            className={`tab ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('signin');
              resetForm();
            }}
          >
            Sign In
          </button>
          <button 
            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('signup');
              resetForm();
            }}
          >
            Sign Up
          </button>
        </div> */}

        <div className="tab-content">
          {activeTab === 'signin' && (
            <>
              {!showMFA ? (
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="staff">Medical Staff</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                  <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying...' : 'Sign In'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleMFASubmit}>
                  <div className="form-group">
                    <label htmlFor="mfa">Verification Code</label>
                    <p className="mfa-info">A verification code has been sent to your email/phone.</p>
                    <input
                      type="text"
                      id="mfa"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      maxLength="6"
                      required
                    />
                  </div>
                  {error && <div className="error-message">{error}</div>}
                  <div className="mfa-actions">
                    <button 
                      type="button" 
                      className="back-button"
                      onClick={() => setShowMFA(false)}
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* {activeTab === 'signup' && (
            <div className="signup-info">
              <h3>Sign Up</h3>
              
              <div className="signup-footer">
                <button
                  className="submit-button"
                  onClick={() => setActiveTab('signin')}
                >
                  Proceed to Sign In
                </button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;