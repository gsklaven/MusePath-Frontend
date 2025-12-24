/**
 * Authentication API Endpoints
 * Handles user registration, login, and logout operations.
 * @module utils/authEndpoints
 */
import { POST, generateTestUser } from './endpointBuilders';

const CATEGORY = 'Authentication';

const SAMPLE_LOGIN = { username: 'john_smith', password: 'Password123!' };

/**
 * Endpoints for user account management.
 */
export const AUTH_ENDPOINTS = [
  // Register new user account with generated test data
  POST('auth-register', CATEGORY, 'Register User', '/auth/register', 
    'Δημιουργία νέου λογαριασμού', generateTestUser),
  
  // Login with username and password to get session token
  POST('auth-login', CATEGORY, 'Login', '/auth/login', 'Σύνδεση χρήστη', 
    SAMPLE_LOGIN),
  
  // Logout and invalidate current session
  POST('auth-logout', CATEGORY, 'Logout', '/auth/logout', 
    'Αποσύνδεση χρήστη', null, 'user'),
];