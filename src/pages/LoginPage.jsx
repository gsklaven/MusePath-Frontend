/**
 * Login page with email/password authentication and validation.
 * Validates inputs using validators.js and redirects to map on success.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateUsername, validatePassword } from '../utils/validators';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateUsername(username)) {
      newErrors.username = 'Username must be 3-30 characters and contain only letters, numbers, underscores, and hyphens';
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(username, password);
      navigate('/map');
    } catch (error) {
      setErrors({ general: error.message || 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          <img src="/assets/logo.png" alt="MusePath Logo" />
        </div>

        {/* Title under logo */}
        <h2 className="auth-subtitle">Login to your MusePath account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">

          {errors.general && <div className="error-message">{errors.general}</div>}

          <FormInput
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" variant="primary" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
