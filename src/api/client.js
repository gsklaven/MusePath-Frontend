import axios from 'axios';
// Global 401 modal handler
let show401Modal = null;

/**
 * Axios client configured for backend API communication.
 * Uses Authorization header with Bearer token for authentication.
 * Falls back to cookies for backwards compatibility.
 * Handles 401 redirects to login page.
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Enable sending cookies with requests (fallback)
});

// Allow global registration of a 401 modal handler
export function register401ModalHandler(fn) {
  show401Modal = fn;
}

// Request interceptor - adds Authorization header if token exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handles unauthorized errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
      if (show401Modal) {
        show401Modal();
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
