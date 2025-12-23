/**
 * API Test Helper Utilities
 * 
 * Collection of helper functions for validating, executing, and logging
 * API tests. Used by the ApiTester hook and components.
 */
import apiClient from '../api/client';

/**
 * Safely serializes an object to JSON.
 * Handles circular references and other serialization errors gracefully.
 * 
 * @param {any} obj - The object to serialize.
 * @returns {string|Object|null} The serialized object or string representation, or null on failure.
 */
export const safeSerialize = (obj) => {
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    try {
      return String(obj);
    } catch (e2) {
      return null;
    }
  }
};

/**
 * Validates if a given path string is a valid API path.
 * Checks for string type, non-empty, no directory traversal, and starting slash.
 * 
 * @param {string} path - The path to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
export const isValidPath = (path) => {
  // Check for string type, non-empty, no traversal, starts with slash
  return typeof path === 'string' 
    && path.length > 0 
    && !path.includes('..') 
    && path.startsWith('/');
};

/**
 * Validates if a given HTTP method is supported.
 * 
 * @param {string} method - The HTTP method to check (e.g., 'GET', 'POST').
 * @returns {boolean} True if the method is supported, false otherwise.
 */
export const isValidMethod = (method) => {
  // Allow standard REST methods
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  return method && allowedMethods.includes(method);
};

/**
 * Validates endpoint configuration object.
 * Checks for valid path and method.
 * 
 * @param {Object} endpoint - The endpoint configuration object.
 * @returns {{isValid: boolean, error: string|null}} Validation result.
 */
export const validateEndpoint = (endpoint) => {
  if (!endpoint || typeof endpoint !== 'object') {
    return { isValid: false, error: 'Invalid endpoint object' };
  }
  
  if (!isValidPath(endpoint.path)) {
    return { isValid: false, error: 'Invalid endpoint path format' };
  }
  
  if (!isValidMethod(endpoint.method)) {
    return { isValid: false, error: 'Invalid endpoint method' };
  }
  
  return { isValid: true, error: null };
};

/**
 * Sanitizes sample data, executing functions if needed.
 * Useful for dynamic data generation.
 * 
 * @param {Object|Function|null} sampleData - The sample data or generator function.
 * @returns {Object} The sanitized data object.
 */
export const sanitizeSampleData = (sampleData) => {
  if (!sampleData) return {};
  
  if (typeof sampleData === 'function') {
    try {
      const result = sampleData();
      return safeSerialize(result);
    } catch (error) {
      console.warn('Error calling sampleData function:', error);
      return {};
    }
  }
  
  if (typeof sampleData === 'object' && sampleData !== null) {
    return safeSerialize(sampleData);
  }
  
  console.warn('Invalid sampleData type, using empty object');
  return {};
};

/**
 * Executes HTTP request based on method.
 * 
 * @param {string} method - HTTP method.
 * @param {string} path - API path.
 * @param {Object} data - Request body data.
 * @returns {Promise<Object>} The Axios response object.
 */
export const executeRequest = async (method, path, data) => {
  const config = {};
  
  switch (method) {
    case 'GET':
      return await apiClient.get(path, config);
    case 'POST':
      return await apiClient.post(path, data, config);
    case 'PUT':
      return await apiClient.put(path, data, config);
    case 'DELETE':
      return await apiClient.delete(path, config);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

/**
 * Creates a standardized success result object for the UI.
 * 
 * @param {Object} response - The Axios response object.
 * @param {number} duration - Request duration in milliseconds.
 * @returns {Object} Formatted success result.
 */
export const createSuccessResult = (response, duration) => {
  // Format successful response for UI display
  return {
    success: true,
    status: typeof response.status === 'number' ? response.status : 200,
    data: safeSerialize(response.data),
    duration: duration,
    error: null,
  };
};

/**
 * Creates a standardized error result object for the UI.
 * 
 * @param {Error} error - The error object caught during request.
 * @param {number} duration - Request duration in milliseconds.
 * @returns {Object} Formatted error result.
 */
export const createErrorResult = (error, duration) => {
  // Format error response for UI display
  return {
    success: false,
    status: error.response?.status || 'ERROR',
    data: safeSerialize(error.response?.data || null),
    duration: duration,
    error: String(error.message),
  };
};

/**
 * Logs the test result to the console with appropriate formatting.
 * 
 * @param {boolean} success - Whether the test passed.
 * @param {string} method - HTTP method.
 * @param {string} path - Request path.
 * @param {Object} details - Additional details to log.
 */
export const logTestResult = (success, method, path, details) => {
  // Log result to console with appropriate icon
  const icon = success ? '✅ Success' : '❌ Failed';
  console.log('%s: %s %s', icon, String(method), String(path), details);
};