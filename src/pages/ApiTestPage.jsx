/**
 * ApiTestPage Component
 * 
 * Development and testing interface for all backend API endpoints.
 * Provides a comprehensive UI for testing REST API calls with real-time results display.
 * 
 * Purpose:
 * - Manual testing of all API endpoints during development
 * - Debugging API responses and error handling
 * - Verifying request/response formats and data structures
 * - Testing authentication flows and data validation
 * 
 * Features:
 * - Organized endpoint categories: Health, Exhibits, Maps, Routes, Users, Downloads
 * - Test execution with loading states and error handling
 * - Connection status indicator with base URL display
 * - Request/response visualization with formatted JSON output
 * - Support for GET, POST, PUT, DELETE methods
 * - Sample data injection for POST/PUT requests
 * - Path validation to prevent directory traversal attacks
 * - Collapsible result sections with success/error color coding
 * 
 * Security:
 * - Validates API paths (no "..", must start with "/")
 * - Sanitizes sample data to prevent injection attacks
 * - Safe serialization of response objects to avoid circular references
 * 
 * State Management:
 * - results: Stores API responses keyed by endpoint ID
 * - loading: Tracks loading state per endpoint
 * - connectionStatus: Overall API connectivity status
 * 
 * Note: This page should only be accessible in development environments.
 */
import React, { useState } from 'react';
import apiClient from '../api/client';
import './ApiTestPage.css';

const ApiTestPage = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Helper: Safely serialize response/error payloads to avoid storing functions or circular refs.
  // Prevents crashes when storing complex objects with circular dependencies in state.
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

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/v1';

  // Όλα τα endpoints του API
  const endpoints = [
    {
      id: 'health',
      category: 'Health Check',
      name: 'Health Status',
      method: 'GET',
      path: '/health',
      description: 'Έλεγχος λειτουργίας API',
      sampleData: null,
    },
    
    // EXHIBITS
    {
      id: 'exhibits-search',
      category: 'Exhibits',
      name: 'Search Exhibits',
      method: 'GET',
      path: '/exhibits/search?exhibit_term=starry&mode=online',
      description: 'Αναζήτηση εκθεμάτων',
      sampleData: null,
    },
    {
      id: 'exhibits-get',
      category: 'Exhibits',
      name: 'Get Exhibit by ID',
      method: 'GET',
      path: '/exhibits/1',
      description: 'Λεπτομέρειες συγκεκριμένου εκθέματος',
      sampleData: null,
    },
    {
      id: 'exhibits-audio',
      category: 'Exhibits',
      name: 'Get Audio Guide',
      method: 'GET',
      path: '/exhibits/1/audio',
      description: 'Audio guide εκθέματος',
      sampleData: null,
    },
    {
      id: 'exhibits-rate',
      category: 'Exhibits',
      name: 'Rate Exhibit',
      method: 'POST',
      path: '/exhibits/1/ratings',
      description: 'Αξιολόγηση εκθέματος',
      sampleData: { rating: 5 },
    },
    {
      id: 'exhibits-download',
      category: 'Exhibits',
      name: 'Download Exhibit',
      method: 'GET',
      path: '/downloads/exhibits/1',
      description: 'Download για offline χρήση',
      sampleData: null,
    },

    // ROUTES
    {
      id: 'routes-create',
      category: 'Routes',
      name: 'Calculate Route',
      method: 'POST',
      path: '/routes',
      description: 'Υπολογισμός διαδρομής',
      sampleData: {
        user_id: 1,
        destination_id: 2,
        startLat: 40.7610,
        startLng: -73.9780,
      },
    },
    {
      id: 'routes-get',
      category: 'Routes',
      name: 'Get Route Details',
      method: 'GET',
      path: '/routes/1',
      description: 'Λεπτομέρειες διαδρομής',
      sampleData: null,
    },
    {
      id: 'routes-update',
      category: 'Routes',
      name: 'Update Route Stops',
      method: 'PUT',
      path: '/routes/1',
      description: 'Ενημέρωση στάσεων διαδρομής',
      sampleData: {
        addStops: [3, 4],
        removeStops: [],
      },
    },
    {
      id: 'routes-recalculate',
      category: 'Routes',
      name: 'Recalculate Route',
      method: 'POST',
      path: '/routes/1',
      description: 'Επαναυπολογισμός διαδρομής',
      sampleData: null,
    },
    {
      id: 'routes-delete',
      category: 'Routes',
      name: 'Delete Route',
      method: 'DELETE',
      path: '/routes/1',
      description: 'Διαγραφή διαδρομής',
      sampleData: null,
    },

    // USERS
    {
      id: 'users-preferences',
      category: 'Users',
      name: 'Update Preferences',
      method: 'PUT',
      path: '/users/1/preferences',
      description: 'Ενημέρωση προτιμήσεων χρήστη',
      sampleData: {
        interests: ['modern art', 'sculpture', 'impressionism'],
      },
    },
    {
      id: 'users-favourites-add',
      category: 'Users',
      name: 'Add to Favourites',
      method: 'POST',
      path: '/users/1/favourites',
      description: 'Προσθήκη στα αγαπημένα',
      sampleData: {
        exhibit_id: 2,
      },
    },
    {
      id: 'users-favourites-remove',
      category: 'Users',
      name: 'Remove from Favourites',
      method: 'DELETE',
      path: '/users/1/favourites/2',
      description: 'Αφαίρεση από αγαπημένα',
      sampleData: null,
    },
    {
      id: 'users-personalized-route',
      category: 'Users',
      name: 'Get Personalized Route',
      method: 'GET',
      path: '/users/1/routes',
      description: 'Εξατομικευμένη διαδρομή',
      sampleData: null,
    },

    // MAPS
    {
      id: 'maps-upload',
      category: 'Maps',
      name: 'Upload Map',
      method: 'POST',
      path: '/maps',
      description: 'Upload χάρτη',
      sampleData: {
        mapData: 'base64_encoded_map_data',
        format: 'image/png',
      },
    },
    {
      id: 'maps-get',
      category: 'Maps',
      name: 'Get Map by ID',
      method: 'GET',
      path: '/maps/1',
      description: 'Λήψη χάρτη',
      sampleData: null,
    },
    {
      id: 'maps-download',
      category: 'Maps',
      name: 'Download Map',
      method: 'GET',
      path: '/downloads/maps/1',
      description: 'Download χάρτη',
      sampleData: null,
    },

    // DESTINATIONS
    {
      id: 'destinations-list',
      category: 'Destinations',
      name: 'List Destinations',
      method: 'GET',
      path: '/destinations',
      description: 'Λίστα όλων των προορισμών',
      sampleData: null,
    },
    {
      id: 'destinations-upload',
      category: 'Destinations',
      name: 'Upload Destinations',
      method: 'POST',
      path: '/destinations',
      description: 'Upload προορισμών',
      sampleData: {
        map_id: 1,
        destinations: [
          {
            name: 'Test Destination',
            type: 'exhibit',
            coordinates: { lat: 40.7610, lng: -73.9780 },
          },
        ],
      },
    },
    {
      id: 'destinations-get',
      category: 'Destinations',
      name: 'Get Destination Info',
      method: 'GET',
      path: '/destinations/1',
      description: 'Πληροφορίες προορισμού',
      sampleData: null,
    },

    // COORDINATES
    {
      id: 'coordinates-get',
      category: 'Coordinates',
      name: 'Get User Coordinates',
      method: 'GET',
      path: '/coordinates/1',
      description: 'Τοποθεσία χρήστη',
      sampleData: null,
    },
    {
      id: 'coordinates-update',
      category: 'Coordinates',
      name: 'Update Coordinates',
      method: 'PUT',
      path: '/coordinates/1',
      description: 'Ενημέρωση τοποθεσίας',
      sampleData: {
        lat: 40.7612,
        lng: -73.9778,
      },
    },

    // NOTIFICATIONS & SYNC
    {
      id: 'notifications-send',
      category: 'Notifications',
      name: 'Send Notification',
      method: 'POST',
      path: '/notifications',
      description: 'Αποστολή ειδοποίησης (Uses route_id 2 - backup route for testing)',
      sampleData: {
        user_id: 1,
        route_id: 2,
        currentLat: 40.7610,
        currentLng: -73.9780,
      },
    },
    {
      id: 'sync-data',
      category: 'Sync',
      name: 'Sync Offline Data',
      method: 'POST',
      path: '/sync',
      description: 'Συγχρονισμός offline δεδομένων',
      sampleData: [
        {
          type: 'rating',
          exhibit_id: 1,
          rating: 5,
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ];

  // Test endpoint using Axios
  const testEndpoint = async (endpoint) => {
    setLoading((prev) => ({ ...prev, [endpoint.id]: true }));
    
    const startTime = Date.now();
    
    // validate endpoint inputs
    if (!endpoint || typeof endpoint !== 'object') {
      console.error('Invalid endpoint object', endpoint);
      setLoading((prev) => ({ ...prev, [endpoint?.id]: false }));
      return;
    }
    
    if (typeof endpoint.path !== 'string' || endpoint.path.length === 0) {
      console.error('Invalid endpoint path', endpoint);
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
      return;
    }
    
    // Sanitize path - prevent path traversal
    if (endpoint.path.includes('..') || !endpoint.path.startsWith('/')) {
      console.error('Invalid endpoint path format', endpoint.path);
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
      return;
    }

    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!endpoint.method || !allowedMethods.includes(endpoint.method)) {
      console.error('Invalid endpoint method', endpoint.method);
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
      return;
    }

    console.log('🧪 Testing: %s %s', String(endpoint.method), String(endpoint.path));
    
    try {
      let response;
      const config = {};
      
      // Validate and sanitize sampleData if present
      let sanitizedData = {};
      if (endpoint.sampleData) {
        if (typeof endpoint.sampleData === 'object' && endpoint.sampleData !== null) {
          sanitizedData = safeSerialize(endpoint.sampleData);
        } else {
          console.warn('Invalid sampleData type, using empty object');
        }
      }

      // Configure request based on method
      if (endpoint.method === 'GET') {
        response = await apiClient.get(endpoint.path, config);
      } else if (endpoint.method === 'POST') {
        response = await apiClient.post(endpoint.path, sanitizedData, config);
      } else if (endpoint.method === 'PUT') {
        response = await apiClient.put(endpoint.path, sanitizedData, config);
      } else if (endpoint.method === 'DELETE') {
        response = await apiClient.delete(endpoint.path, config);
      }

  const duration = Date.now() - startTime;

      const safeData = safeSerialize(response.data);
      console.log('✅ Success: %s %s', String(endpoint.method), String(endpoint.path), {
        status: response.status,
        duration: `${duration}ms`,
        data: safeData,
      });

      setResults((prev) => ({
        ...prev,
        [endpoint.id]: {
          success: true,
          status: typeof response.status === 'number' ? response.status : 200,
          data: safeData,
          duration: duration,
          error: null,
        },
      }));
    } catch (error) {
      const duration = Date.now() - startTime;
      const status = error.response?.status || 'ERROR';
      const errorData = safeSerialize(error.response?.data || null);
      
      console.error('❌ Failed: %s %s', String(endpoint.method), String(endpoint.path), {
        status: status,
        duration: `${duration}ms`,
        error: String(error.message),
        response: errorData,
      });

      setResults((prev) => ({
        ...prev,
        [endpoint.id]: {
          success: false,
          status: status,
          data: errorData,
          duration: duration,
          error: String(error.message),
        },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [endpoint.id]: false }));
    }
  };

  // Test όλα τα endpoints
  const testAllEndpoints = async () => {
    console.log('🚀 Starting to test all endpoints...');
    console.log('⏱️  Delay between requests: 1000ms');
    
    for (const endpoint of endpoints) {
      await testEndpoint(endpoint);
      // Delay μεταξύ requests για να φαίνονται στο Network tab
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    
    console.log('✅ Finished testing all endpoints');
  };

  // Check connection using Axios
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

  // Group endpoints by category
  const groupedEndpoints = endpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {});

  return (
    <div className="api-test-page">
      <header className="api-test-header">
        <h1>🧪 MusePath API Test Dashboard</h1>
        <p>Δοκιμάστε όλα τα endpoints του backend με ένα κλικ</p>
        
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

          <button onClick={testAllEndpoints} className="btn btn-primary">
            ▶️ Test All Endpoints
          </button>

          <div className="api-url">
            <strong>API URL:</strong> {API_BASE_URL}
          </div>
        </div>
      </header>

      <div className="api-test-content">
        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Total Endpoints:</span>
            <span className="stat-value">{endpoints.length}</span>
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

                  {endpoint.sampleData && (
                    <details className="sample-data">
                      <summary>📝 Sample Request Body</summary>
                      <pre>{JSON.stringify(endpoint.sampleData, null, 2)}</pre>
                    </details>
                  )}

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
          💡 <strong>Tip:</strong> Βεβαιωθείτε ότι το Backend τρέχει στο{' '}
          <code>{API_BASE_URL}</code>
        </p>
        <p>
          📚 Για περισσότερες πληροφορίες, δείτε το <code>README.md</code>
        </p>
      </footer>
    </div>
  );
};

export default ApiTestPage;
