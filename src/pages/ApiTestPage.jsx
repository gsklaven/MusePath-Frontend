/**
 * @file ApiTestPage.jsx
 * @description A development and testing interface for all backend API endpoints.
 * This page provides a UI to trigger and inspect API calls, view their results,
 * and test different authentication scenarios. It's a crucial tool for backend and frontend integration testing.
 */
import React, { useState } from 'react';
import apiClient from '../api/client';
import { ALL_ENDPOINTS } from '../utils/apiEndpoints';
import * as authApi from '../api/auth';
import './ApiTestPage.css';

// Test user credentials (matching mock data)
const ADMIN_USER = { username: 'john_smith', password: 'Password123!' };
const NORMAL_USER = { username: 'john_smith', password: 'Password123!' };

/**
 * Safely serializes an object to JSON, handling circular references and other errors.
 * @param {*} obj - The object to serialize.
 * @returns {string|null} The serialized JSON string, a string representation, or null if serialization fails.
 */
const safeSerialize = (obj) => {
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
 * Validates an endpoint path for security, ensuring it's a valid string and not a traversal attempt.
 * @param {string} path - The endpoint path to validate.
 * @returns {boolean} True if the path is valid.
 */
const isValidPath = (path) => {
  return typeof path === 'string' 
    && path.length > 0 
    && !path.includes('..') 
    && path.startsWith('/');
};

/**
 * Validates that the HTTP method is one of the allowed methods.
 * @param {string} method - The HTTP method to validate.
 * @returns {boolean} True if the method is allowed.
 */
const isValidMethod = (method) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  return method && allowedMethods.includes(method);
};

/**
 * Validates the structure of an endpoint configuration object.
 * @param {object} endpoint - The endpoint configuration object.
 * @returns {{isValid: boolean, error: string|null}} An object indicating if the endpoint is valid and an error message if not.
 */
const validateEndpoint = (endpoint) => {
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
 * Sanitizes the sample data for an API request. If the data is a function, it's executed to get fresh data.
 * @param {*} sampleData - The data to sanitize, which can be an object or a function.
 * @returns {object} A sanitized data object ready for the request body.
 */
const sanitizeSampleData = (sampleData) => {
  if (!sampleData) return {};
  
  // If sampleData is a function, call it to get fresh data
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
 * Executes an HTTP request using the API client based on the specified method.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} path - The API endpoint path.
 * @param {object} data - The request body data for POST and PUT requests.
 * @returns {Promise<object>} A promise that resolves with the Axios response.
 */
const executeRequest = async (method, path, data) => {
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
 * @param {object} response - The Axios response object.
 * @param {number} duration - The request duration in milliseconds.
 * @returns {object} A success result object.
 */
const createSuccessResult = (response, duration) => {
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
 * @param {Error} error - The error object caught during the request.
 * @param {number} duration - The request duration in milliseconds.
 * @returns {object} An error result object.
 */
const createErrorResult = (error, duration) => {
  return {
    success: false,
    status: error.response?.status || 'ERROR',
    data: safeSerialize(error.response?.data || null),
    duration: duration,
    error: String(error.message),
  };
};

/**
 * Logs the result of an API test to the console for debugging.
 * @param {boolean} success - Whether the test was successful.
 * @param {string} method - The HTTP method used.
 * @param {string} path - The API endpoint path.
 * @param {object} details - Additional details about the test result.
 */
const logTestResult = (success, method, path, details) => {
  const icon = success ? '✅ Success' : '❌ Failed';
  console.log(`${icon}: ${String(method)} ${String(path)}`, details);
};

/**
 * Renders the API test page, a dashboard for manually testing all backend endpoints.
 * @returns {JSX.Element} The ApiTestPage component.
 */
const ApiTestPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [authStatus, setAuthStatus] = useState({ loggedIn: false, as: null });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1';

  /**
   * Logs in a user with the given credentials and role.
   * @param {object} user - User credentials ({username, password}).
   * @param {string} role - The role of the user ('user' or 'admin').
   */
  const login = async (user, role) => {
    try {
      await authApi.login(user.username, user.password);
      setAuthStatus({ loggedIn: true, as: role });
      console.log(`🔐 Logged in as ${role}: ${user.username}`);
    } catch (error) {
      console.error(`❌ Login failed for ${role}:`, error.message);
      throw error;
    }
  };

  /**
   * Logs out the current user.
   */
  const logout = async () => {
    try {
      await authApi.logout();
      setAuthStatus({ loggedIn: false, as: null });
      console.log('🔓 Logged out');
    } catch (error) {
      console.warn('Logout error (continuing anyway):', error.message);
      setAuthStatus({ loggedIn: false, as: null });
    }
  };

  /**
   * Orchestrates the testing of a single API endpoint, handling auth, execution, and result display.
   * @param {object} endpoint - The endpoint configuration from `apiEndpoints.js`.
   */
  const testEndpoint = async (endpoint) => {
    // Set loading state
    setLoading((prev) => ({ ...prev, [endpoint.id]: true }));
    
    const startTime = Date.now();
    
    // Validate endpoint configuration
    const validation = validateEndpoint(endpoint);
    if (!validation.isValid) {
      console.error(validation.error, endpoint);
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
      return;
    }

    // For DELETE tests, create a resource first to ensure something exists to be deleted.
    let dynamicPath = endpoint.path;
    if (endpoint.createFirst) {
      const createEndpoint = ALL_ENDPOINTS.find(e => e.id === endpoint.createFirst);
      if (createEndpoint) {
        console.log('📝 Creating resource first for deletion test...');
        try {
          // Ensure proper auth for creation
          if (createEndpoint.requiresAuth === 'admin' && authStatus.as !== 'admin') {
            await login(ADMIN_USER, 'admin');
          }
          
          const sanitizedData = sanitizeSampleData(createEndpoint.sampleData);
          const createResponse = await executeRequest(
            createEndpoint.method,
            createEndpoint.path,
            sanitizedData
          );
          
          // Extract the ID from the response to build the dynamic path for deletion.
          let createdId = null;
          if (createResponse.data?.data?.exhibitId) {
            createdId = createResponse.data.data.exhibitId;
          } else if (createResponse.data?.data?.mapId || createResponse.data?.data?.map_id) {
            createdId = createResponse.data.data.mapId || createResponse.data.data.map_id;
          } else if (createResponse.data?.data?.destinationIds?.[0]) {
            createdId = createResponse.data.data.destinationIds[0];
          } else if (createResponse.data?.data?.routeId || createResponse.data?.data?.route_id) {
            createdId = createResponse.data.data.routeId || createResponse.data.data.route_id;
          }
          
          if (createdId) {
            dynamicPath = endpoint.path.replace(/\/\d+$/, `/${createdId}`);
            console.log(`✅ Created resource with ID ${createdId}, will delete: ${dynamicPath}`);
          } else {
            console.warn('⚠️ Could not extract ID from create response, using original path');
          }
        } catch (error) {
          console.error('❌ Failed to create resource for deletion test:', error.message);
          // Continue with original path anyway
        }
      }
    }

    console.log(`🧪 Testing: ${String(endpoint.method)} ${String(dynamicPath)}`);
    
    try {
      // Handle authentication if required
      if (endpoint.requiresAuth === 'admin') {
        if (authStatus.as !== 'admin') {
          await login(ADMIN_USER, 'admin');
        }
      } else if (endpoint.requiresAuth === 'user') {
        if (!authStatus.loggedIn || authStatus.as === null) {
          await login(NORMAL_USER, 'user');
        }
      } else if (endpoint.requiresAuth === null && authStatus.loggedIn) {
        // Public endpoint, ensure logged out
        await logout();
      }

      // Sanitize request data
      const sanitizedData = sanitizeSampleData(endpoint.sampleData);
      
      // Execute request (use dynamicPath if it was modified)
      const response = await executeRequest(
        endpoint.method, 
        dynamicPath, 
        sanitizedData
      );
      
      const duration = Date.now() - startTime;
      
      // Log success
      logTestResult(true, endpoint.method, dynamicPath, {
        status: response.status,
        duration: `${duration}ms`,
        data: safeSerialize(response.data),
      });

      // Store success result
      setResults((prev) => ({
        ...prev,
        [endpoint.id]: createSuccessResult(response, duration),
      }));
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Log error
      logTestResult(false, endpoint.method, dynamicPath, {
        status: error.response?.status || 'ERROR',
        duration: `${duration}ms`,
        error: String(error.message),
        response: safeSerialize(error.response?.data || null),
      });

      // Store error result
      setResults((prev) => ({
        ...prev,
        [endpoint.id]: createErrorResult(error, duration),
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
    }
  };

  /**
   * Tests all defined endpoints sequentially with a delay between each test.
   */
  const testAllEndpoints = async () => {
    console.log('🚀 Starting to test all endpoints...');
    console.log('⏱️  Delay between requests: 1000ms');
    
    for (const endpoint of ALL_ENDPOINTS) {
      await testEndpoint(endpoint);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Finished testing all endpoints');
  };

  /**
   * Checks the backend connection by hitting the /health endpoint.
   */
  const checkConnection = async () => {
    console.log('🔌 Checking connection to backend...');
    
    try {
      const response = await apiClient.get('/health');
      console.log('✅ Backend connection successful', response.data);
      
      setConnectionStatus({
        connected: true,
        message: response.data.message || 'Connected',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('❌ Backend connection failed', error);
      
      setConnectionStatus({
        connected: false,
        message: error.message || 'Connection failed',
        timestamp: new Date().toISOString(),
      });
    }
  };

  /**
   * Groups endpoints by their 'category' property for organized rendering in the UI.
   * @returns {object} An object where keys are categories and values are arrays of endpoints.
   */
  const getGroupedEndpoints = () => {
    return ALL_ENDPOINTS.reduce((acc, endpoint) => {
      if (!acc[endpoint.category]) {
        acc[endpoint.category] = [];
      }
      acc[endpoint.category].push(endpoint);
      return acc;
    }, {});
  };

  const groupedEndpoints = getGroupedEndpoints();

  return (
    <div className="api-test-page">
      <header className="api-test-header">
        <h1>🧪 MusePath API Test Dashboard</h1>
        <p>A tool to test all backend endpoints with a single click.</p>
        
        <div className="header-actions">
          <div className="connection-status">
            <button onClick={checkConnection} className="btn btn-secondary">
              🔌 Check Connection
            </button>
            {connectionStatus && (
              <div className={`status-badge ${connectionStatus.connected ? 'connected' : 'disconnected'}`}>
                {connectionStatus.connected ? '✓ Connected' : '✗ Disconnected'}
              </div>
            )}
          </div>

          <div className="auth-status">
            {authStatus.loggedIn ? (
              <div className="status-badge connected">
                🔐 Logged in as {authStatus.as}
              </div>
            ) : (
              <div className="status-badge disconnected">
                🔓 Not logged in
              </div>
            )}
          </div>

          <button onClick={testAllEndpoints} className="btn btn-primary">
            ▶️ Test All Endpoints
          </button>

          <div className="api-url">
            <strong>API URL:</strong> {API_BASE_URL}
          </div>
        </div>
      </header>

      {/* Main content area with statistics and endpoint cards */}
      <div className="api-test-content">
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Endpoints:</span>
            <span className="stat-value">{ALL_ENDPOINTS.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Tested:</span>
            <span className="stat-value">{Object.keys(results).length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Successful:</span>
            <span className="stat-value success">
              {Object.values(results).filter((r) => r.success).length}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Failed:</span>
            <span className="stat-value error">
              {Object.values(results).filter((r) => !r.success).length}
            </span>
          </div>
        </div>

        {/* Render endpoints grouped by category */}
        {Object.entries(groupedEndpoints).map(([category, categoryEndpoints]) => (
          <div key={category} className="endpoint-category">
            <h2 className="category-title">📂 {category}</h2>
            
            <div className="endpoints-grid">
              {categoryEndpoints.map((endpoint) => (
                <div key={endpoint.id} className="endpoint-card">
                  <div className="endpoint-header">
                    <div className="endpoint-info">
                      <span className={`method-badge ${endpoint.method.toLowerCase()}`}>
                        {endpoint.method}
                      </span>
                      <h3>{endpoint.name}</h3>
                      {endpoint.requiresAuth && (
                        <span className="auth-badge">
                          {endpoint.requiresAuth === 'admin' ? '🔒 Admin' : '🔐 User'}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => testEndpoint(endpoint)}
                      disabled={loading[endpoint.id]}
                      className="btn btn-test"
                    >
                      {loading[endpoint.id] ? '⏳ Testing...' : '▶️ Run'}
                    </button>
                  </div>

                  <div className="endpoint-details">
                    <p className="endpoint-description">{endpoint.description}</p>
                    <code className="endpoint-path">{endpoint.path}</code>
                  </div>

                  {/* Display sample request body if available */}
                  {endpoint.sampleData && (
                    <details className="sample-data">
                      <summary>📝 Sample Request Body</summary>
                      <pre>{JSON.stringify(
                        typeof endpoint.sampleData === 'function' 
                          ? endpoint.sampleData() 
                          : endpoint.sampleData, 
                        null, 
                        2
                      )}</pre>
                    </details>
                  )}

                  {/* Display the result of the API test */}
                  {results[endpoint.id] && (
                    <div className={`result-box ${results[endpoint.id].success ? 'success' : 'error'}`}>
                      <div className="result-header">
                        <span className="result-status">
                          {results[endpoint.id].success ? '✓' : '✗'} 
                          Status: {results[endpoint.id].status}
                        </span>
                        <span className="result-duration">
                          ⏱️ {results[endpoint.id].duration}ms
                        </span>
                      </div>

                      {results[endpoint.id].error ? (
                        <div className="result-error">
                          <strong>Error:</strong> {results[endpoint.id].error}
                        </div>
                      ) : (
                        <details className="result-data" open={results[endpoint.id].success}>
                          <summary>📦 Response Data</summary>
                          <pre>{JSON.stringify(results[endpoint.id].data, null, 2)}</pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="api-test-footer">
        <p>
          💡 <strong>Tip:</strong> Make sure the backend is running at{' '}
          <code>{API_BASE_URL}</code>
        </p>
        <p>
          📚 For more information, see the <code>README.md</code>
        </p>
      </footer>
    </div>
  );
};

export default ApiTestPage;