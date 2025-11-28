import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validators';
import Button from '../components/Button';
import './RegisterPage.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      register(email, password);
      navigate('/questionnaire-intro');
    } catch {
      setErrors({ general: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Create a MusePath Account</h1>
        <p className="auth-subtitle">Join the journey into culture</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && <div className="error-message">{errors.general}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <Button type="submit" variant="primary" className="auth-button">
            Register
          </Button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
