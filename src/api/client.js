import axios from 'axios';

/**
 * Axios client configured for backend API communication.
 * Uses httpOnly cookies for authentication (token sent automatically).
 * Handles 401 redirects to login page.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Response interceptor - handles unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Redirect to login on 401 (unauthorized)
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
