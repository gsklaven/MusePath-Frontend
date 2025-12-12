/**
 * RegisterPage Component
 * 
 * User registration interface for creating new MusePath accounts.
 * Collects email, password, and confirmation with validation before account creation.
 * 
 * Purpose:
 * - Enable new users to create museum app accounts
 * - Validate email format and password strength
 * - Ensure password confirmation matches for security
 * - Redirect to questionnaire intro after successful registration
 * 
 * Form Fields:
 * - Email: Valid email address for account identification and login
 * - Password: Minimum 6 characters for account security
 * - Confirm Password: Must match password field to prevent typos
 * 
 * Validation Rules:
 * - Email: Must match standard email format (name@domain.com)
 * - Password: Minimum 6 characters required for security
 * - Confirm Password: Must exactly match password field
 * - All fields required before submission
 * 
 * Features:
 * - Real-time Error Display: Shows validation errors under each field
 * - Form Validation: Client-side checks before API call
 * - Password Confirmation: Prevents typo errors during registration
 * - Navigation: Links to login page for existing users
 * - Responsive Design: Works on mobile and desktop devices
 * - FormInput Component: Reusable input fields with label and error display
 * 
 * User Flow:
 * 1. User enters email address
 * 2. User creates password (min 6 chars)
 * 3. User confirms password by re-entering
 * 4. User clicks "Register" button
 * 5. Validation checks email format, password length, and match
 * 6. If valid, register() called from AuthContext
 * 7. Account created and user redirected to /questionnaire-intro
 * 8. If invalid, error messages displayed under respective fields
 * 
 * State Management:
 * - email: Current email input value
 * - password: Current password input value
 * - confirmPassword: Current password confirmation value
 * - errors: Object containing field-specific error messages
 * 
 * Error Handling:
 * - Email format validation using validateEmail() utility
 * - Password length validation using validatePassword() utility
 * - Password match validation (password === confirmPassword)
 * - General error for registration API failures
 * - Errors cleared on successful submission
 * 
 * API Integration:
 * - register(email, password): Creates new user account via AuthContext
 * - Stores user credentials securely
 * - Sets up authentication token for subsequent requests
 * - Updates global user state in AuthContext
 * 
 * Navigation:
 * - Success: Redirects to /questionnaire-intro for preference collection
 * - Login Link: Takes existing users to /login page
 * - Seamless flow from registration → preferences → map
 * 
 * Security Considerations:
 * - Password minimum length enforced (6 characters)
 * - Password confirmation prevents typo-based account lockouts
 * - Client-side validation before sending data to backend
 * - Passwords transmitted securely to backend API
 * 
 * Visual Design:
 * - Clean centered card layout on light background
 * - MusePath branding with "Join the journey into culture" tagline
 * - Large touch-friendly buttons for mobile devices
 * - Error messages in red for high visibility
 * - Consistent styling with LoginPage for brand coherence
 * 
 * Integration Points:
 * - Uses AuthContext.register() for account creation
 * - validateEmail() and validatePassword() from utils/validators
 * - FormInput component for consistent field styling
 * - Button component for styled submit button
 * - React Router for navigation after registration
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateUsername, validatePassword } from '../utils/validators';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { register, login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate username
    if (!validateUsername(username)) {
      newErrors.username = 'Username must be 3-30 characters and contain only letters, numbers, underscores, and hyphens';
    }

    // Validate email format
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message;
    }

    // Check password match
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await register(username, email, password);
      // Automatically login after successful registration
      await login(username, password);
      navigate('/questionnaire-intro');
    } catch (error) {
      setErrors({ general: error.message || 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h1 className="auth-title">Create a MusePath Account</h1>
        <p className="auth-subtitle">Join the journey into culture</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && <div className="error-message">{errors.general}</div>}

          <FormInput
            label="Username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />

          <Button type="submit" variant="primary" className="auth-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
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
