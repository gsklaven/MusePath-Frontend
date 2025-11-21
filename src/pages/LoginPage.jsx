import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import Button from '../components/Button';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in or after successful login
  useEffect(() => {
    console.log('LoginPage: user state changed', user);
    if (user) {
      console.log('LoginPage: Navigating to /map');
      navigate('/map', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('LoginPage: Form submitted');
    
    const newErrors = {};
    
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      console.log('LoginPage: Calling login...');
      const result = await login(email, password);
      console.log('LoginPage: Login successful', result);
      // Navigation will happen automatically via useEffect
      // when user state updates
    } catch (error) {
      console.error('LoginPage: Login failed', error);
      setErrors({ general: 'Login failed. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          {!logoError ? (
            <img 
              src="/logo.png" 
              alt="MusePath Logo" 
              className="auth-logo-icon"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="auth-logo-fallback">🏛️</div>
          )}
        </div>
        <h1 className="auth-title">MusePath</h1>
        <h2 className="auth-subtitle">Login to Your Account</h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div className="error-message">{errors.general}</div>
          )}
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <Button type="submit" variant="primary" className="auth-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
