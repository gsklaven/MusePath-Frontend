import apiClient from './client';

/**
 * Authentication API calls
 * Handles user registration, login, and logout with backend
 */

/**
 * Register a new user
 * @param {string} username - User's username (3-30 chars, letters, numbers, underscores, hyphens)
 * @param {string} email - User's email address
 * @param {string} password - User's password (min 6 characters)
 * @returns {Promise<Object>} User data (without password)
 */
export const register = async (username, email, password) => {
  try {
    const response = await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
    
    // Backend returns: { success: true, data: user, message: '...' }
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    throw new Error(errorMessage);
  }
};

/**
 * Login user
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise<Object>} User data (without password)
 */
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      username,
      password,
    });
    
    // Backend returns: { success: true, data: { user: {...}, token: "..." }, message: '...' }
    const { user, token } = response.data.data;
    
    // Store token in localStorage for Authorization header
    if (token) {
      localStorage.setItem('authToken', token);
    }
    
    return user;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(errorMessage);
  }
};

/**
 * Logout user
 * Clears authentication token from backend cookie and localStorage
 * @returns {Promise<void>}
 */
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
  } catch (error) {
    localStorage.removeItem('authToken');
    const errorMessage = error.response?.data?.message || error.message || 'Logout failed';
    throw new Error(errorMessage);
  }
};
