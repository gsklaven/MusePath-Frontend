import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      login(email, password);
      navigate('/map');
    } catch {
      setErrors({ general: 'Login failed. Please try again.' });
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
            label="Email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" variant="primary" className="auth-button">
            Login
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
