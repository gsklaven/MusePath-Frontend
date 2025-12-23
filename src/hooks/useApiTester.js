import { useState } from 'react';
import apiClient from '../api/client';
import * as authApi from '../api/auth';
import { ALL_ENDPOINTS } from '../utils/apiEndpoints';
import { 
  validateEndpoint, 
  sanitizeSampleData, 
  executeRequest, 
  createSuccessResult, 
  createErrorResult, 
  logTestResult, 
  safeSerialize 
} from '../utils/apiTestHelpers';

const ADMIN_USER = { username: 'john_smith', password: 'Password123!' };
const NORMAL_USER = { username: 'john_smith', password: 'Password123!' };

export const useApiTester = () => {
  // State for test results, loading status, connection, and auth
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [authStatus, setAuthStatus] = useState({ loggedIn: false, as: null });

  // Logs in a user with the given credentials and role
  const login = async (user, role) => {
    try {
      await authApi.login(user.username, user.password);
      setAuthStatus({ loggedIn: true, as: role });
      console.log('🔐 Logged in as %s: %s', role, user.username);
    } catch (error) {
      console.error('❌ Login failed for %s:', role, error.message);
      throw error;
    }
  };

  // Logs out the current user
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

  // Orchestrates the testing of a single API endpoint
  const testEndpoint = async (endpoint) => {
    setLoading((prev) => ({ ...prev, [endpoint.id]: true }));
    
    const startTime = Date.now();
    
    // Validate endpoint configuration before proceeding
    const validation = validateEndpoint(endpoint);
    if (!validation.isValid) {
      console.error(validation.error, endpoint);
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
      return;
    }

    let dynamicPath = endpoint.path;
    // Handle endpoints that require a resource to be created first (e.g., DELETE)
    if (endpoint.createFirst) {
      const createEndpoint = ALL_ENDPOINTS.find(e => e.id === endpoint.createFirst);
      if (createEndpoint) {
        console.log('📝 Creating resource first for deletion test...');
        try {
          // Ensure admin auth if creation requires it
          if (createEndpoint.requiresAuth === 'admin' && authStatus.as !== 'admin') {
            await login(ADMIN_USER, 'admin');
          }
          
          const sanitizedData = sanitizeSampleData(createEndpoint.sampleData);
          const createResponse = await executeRequest(
            createEndpoint.method,
            createEndpoint.path,
            sanitizedData
          );
          
          // Extract ID from creation response to build dynamic path
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
            console.log('✅ Created resource with ID %s, will delete: %s', createdId, dynamicPath);
          } else {
            console.warn('⚠️ Could not extract ID from create response, using original path');
          }
        } catch (error) {
          console.error('❌ Failed to create resource for deletion test:', error.message);
        }
      }
    }

    console.log('🧪 Testing: %s %s', String(endpoint.method), String(dynamicPath));
    
    try {
      // Handle authentication requirements for the target endpoint
      if (endpoint.requiresAuth === 'admin') {
        if (authStatus.as !== 'admin') {
          await login(ADMIN_USER, 'admin');
        }
      } else if (endpoint.requiresAuth === 'user') {
        if (!authStatus.loggedIn || authStatus.as === null) {
          await login(NORMAL_USER, 'user');
        }
      } else if (endpoint.requiresAuth === null && authStatus.loggedIn) {
        await logout();
      }

      const sanitizedData = sanitizeSampleData(endpoint.sampleData);
      
      // Execute the actual API request
      const response = await executeRequest(
        endpoint.method, 
        dynamicPath, 
        sanitizedData
      );
      
      const duration = Date.now() - startTime;
      
      // Log success and update state
      logTestResult(true, endpoint.method, dynamicPath, {
        status: response.status,
        duration: `${duration}ms`,
        data: safeSerialize(response.data),
      });

      setResults((prev) => ({
        ...prev,
        [endpoint.id]: createSuccessResult(response, duration),
      }));
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Log error and update state
      logTestResult(false, endpoint.method, dynamicPath, {
        status: error.response?.status || 'ERROR',
        duration: `${duration}ms`,
        error: String(error.message),
        response: safeSerialize(error.response?.data || null),
      });

      setResults((prev) => ({
        ...prev,
        [endpoint.id]: createErrorResult(error, duration),
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
    }
  };

  // Tests all defined endpoints sequentially
  const testAllEndpoints = async () => {
    console.log('🚀 Starting to test all endpoints...');
    console.log('⏱️  Delay between requests: 1000ms');
    
    // Iterate through all endpoints with a delay
    for (const endpoint of ALL_ENDPOINTS) {
      await testEndpoint(endpoint);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Finished testing all endpoints');
  };

  // Checks the backend connection by hitting the /health endpoint
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

  return {
    results,
    loading,
    connectionStatus,
    authStatus,
    testEndpoint,
    testAllEndpoints,
    checkConnection
  };
};