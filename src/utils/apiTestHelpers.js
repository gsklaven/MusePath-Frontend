import apiClient from '../api/client';

/**
 * Safely serializes an object to JSON.
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

export const isValidPath = (path) => {
  // Check for string type, non-empty, no traversal, starts with slash
  return typeof path === 'string' 
    && path.length > 0 
    && !path.includes('..') 
    && path.startsWith('/');
};

export const isValidMethod = (method) => {
  // Allow standard REST methods
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  return method && allowedMethods.includes(method);
};

/**
 * Validates endpoint configuration object.
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

export const logTestResult = (success, method, path, details) => {
  // Log result to console with appropriate icon
  const icon = success ? '✅ Success' : '❌ Failed';
  console.log('%s: %s %s', icon, String(method), String(path), details);
};